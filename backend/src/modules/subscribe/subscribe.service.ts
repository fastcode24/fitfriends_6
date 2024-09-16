import { ConflictException, Injectable } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { UserService } from '../user/user.service';
import { TokenPayload, UserRole } from 'src/libs/types';
import { RabbitService } from '../rabbit/rabbit.service';
import { MailNewTrainingDto, NewTrainingNoticeDto } from './dto';

@Injectable()
export class SubscribeService {
  constructor(
    private readonly mailService: MailService,
    private readonly rabbitService: RabbitService,
    private readonly userService: UserService,
  ) {}

  private async getCoachSubscribers(coachId: string): Promise<string[]> {
    const existsCoach = await this.userService.getUserById(coachId);
    let subscribers: string[] = [];

    if (existsCoach) {
      subscribers = existsCoach.subscribers;
    } else {
      throw new Error(`Тренер с id ${existsCoach} не найден`);
    }

    return subscribers;
  }

  public async addNewSubscription({ sub, name, email }: TokenPayload, coachId: string): Promise<void> {
    const userId = sub;
    const coach = await this.userService.getUserEntity(coachId);

    if (!coach) {
      throw new ConflictException(`Тренер с id ${coachId} не найден`);
    }

    if (coach.role !== UserRole.Coach) {
      throw new ConflictException(`Подписка возможна только на пользователей с ролью: тренер`);
    }

    const subscribers = await this.getCoachSubscribers(coachId);

    if (subscribers.includes(userId)) {
      throw new ConflictException('Подписка уже есть');
    }

    subscribers.push(userId);

    await this.userService.updateSubscribers(coachId, subscribers);
    await this.rabbitService.queueNewSubscription({email, userName: name, coachName: coach.name});
  }

  public async removeSubscription({ sub }: TokenPayload, coachId: string): Promise<void> {
    const userId = sub;
    const coach = await this.userService.getUserEntity(coachId);

    if (!coach) {
      throw new ConflictException(`Тренер с id ${coachId} не найден`);
    }

    const subscribers = await this.getCoachSubscribers(coachId);

    if (!subscribers.includes(userId)) {
      throw new ConflictException('У пользователя нет подписки на данного тренера');
    }

    const updatedSubscribers = subscribers.filter(subscriber => subscriber !== userId);
    await this.userService.updateSubscribers(coachId, updatedSubscribers);
  }

  public async sendNewTrainingNotice(coachId: string, newTrainingNoticeData: NewTrainingNoticeDto) {
    const coach = await this.userService.getUserEntity(coachId);

    if (!coach) {
      throw new ConflictException(`Тренер с id ${coachId} не найден`);
    }

    const subscribers = await this.getCoachSubscribers(coachId);

    for (const subscriberId of subscribers) {
      const subscriber = await this.userService.getUserEntity(subscriberId);
      await this.rabbitService.queueNewTraining({...newTrainingNoticeData, email: subscriber.email, userName: subscriber.name, coachName: coach.name});
    }
  }
}
