import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { fillDto } from 'src/libs/helpers';
import { NotifyEntity } from './notify.entity';
import { NotifyRdo } from './rdo';
import { NotifyRepository } from './notify.repository';

@Injectable()
export class NotifyService {
  constructor(
    private readonly notifyRepository: NotifyRepository,
  ) {}

  public async create(userId: string, text: string): Promise<NotifyRdo> {
    const newNotify = NotifyEntity.fromObject({
      userId,
      text,
    });

    const notifyEntity = new NotifyEntity(newNotify);
    const notify = await this.notifyRepository.save(notifyEntity);

    return fillDto(NotifyRdo, notify.toPOJO());
  }

  public async find(userId: string): Promise<NotifyRdo[]> {
    const notify = await this.notifyRepository.find(userId);

    return notify.map((notify) =>
      fillDto(NotifyRdo, notify.toPOJO()),
    );
  }

  public async remove(notifyId: string, userId: string): Promise<void> {
    const existsNotify = await this.notifyRepository.findById(notifyId);

    if (!existsNotify) {
      throw new NotFoundException(`Оповещение с ID ${notifyId} не найдено.`);
    }

    if (existsNotify.userId !== userId) {
      throw new ForbiddenException();
    }

    await this.notifyRepository.deleteById(notifyId);
  }
}
