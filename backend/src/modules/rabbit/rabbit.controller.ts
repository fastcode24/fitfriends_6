import { RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";
import { Controller } from "@nestjs/common";
import { MailService } from "../mail/mail.service";
import { RabbitRouting } from "src/libs/types";
import { MailNewSubscriptionDto, MailNewTrainingDto } from "../subscribe/dto";

@Controller()
export class RabbitController {
  constructor(
    private readonly mailService: MailService,
  ) {}

  @RabbitSubscribe({
    exchange: 'fitfriends.income',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'fitfriends.income',
  })
  public async sendNewSubscriptionRabbit(emailData: MailNewSubscriptionDto) {
    this.mailService.sendNewSubscription(emailData);
  }

  @RabbitSubscribe({
    exchange: 'fitfriends.income',
    routingKey: RabbitRouting.NewTraining,
    queue: 'fitfriends.income',
  })
  public async sendNewTrainingRabbit(emailData: MailNewTrainingDto) {
    this.mailService.sendNewTraining(emailData);
  }
}
