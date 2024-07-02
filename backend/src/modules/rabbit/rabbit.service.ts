import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { rabbitConfig } from 'src/libs/config';
import { RabbitRouting } from 'src/libs/types';
import { MailNewSubscriptionDto, MailNewTrainingDto } from '../subscribe/dto';

@Injectable()
export class RabbitService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>
  ) {}

  public async queueNewSubscription(dto: MailNewSubscriptionDto) {
    await this.rabbitClient.publish(
      this.rabbitOptions.exchange,
      RabbitRouting.AddSubscriber,
      { ...dto }
    );
  }

  public async queueNewTraining(dto: MailNewTrainingDto) {
    await this.rabbitClient.publish(
      this.rabbitOptions.exchange,
      RabbitRouting.NewTraining,
      { ...dto }
    );
  }
}
