import { Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigType } from '@nestjs/config';
import { MailTemplate, MailSubject } from 'src/app.const';
import { mailConfig } from 'src/libs/config';
import { MailNewSubscriptionDto, MailNewTrainingDto } from '../subscribe/dto';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
  ) {}

  @Inject(mailConfig.KEY)
  private readonly mailConfig: ConfigType<typeof mailConfig>;

  public async sendNewSubscription(emailData: MailNewSubscriptionDto) {
    await this.mailerService.sendMail({
      from: this.mailConfig.from,
      to: emailData.email,
      subject: MailSubject.NewSubscription,
      template: MailTemplate.NewSubscription,
      context: {
        userName: emailData.userName,
        coachName: emailData.coachName,
      },
    });
  }

  public async sendNewTraining(emailData: MailNewTrainingDto) {
    await this.mailerService.sendMail({
      from: this.mailConfig.from,
      to: emailData.email,
      subject: MailSubject.NewTraining,
      template: MailTemplate.NewTraining,
      context: {
        userName: emailData.userName,
        coachName: emailData.coachName,
        title: emailData.title,
        description: emailData.description,
        gender: emailData.gender,
        trainingType: emailData.trainingType,
        trainingTime: emailData.trainingTime,
        calories: emailData.calories,
        price: emailData.price,
      },
    });
  }
}
