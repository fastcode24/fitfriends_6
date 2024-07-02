import { Module } from '@nestjs/common';
import { RabbitService } from './rabbit.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from 'src/libs/config';
import { MailService } from '../mail/mail.service';
import { MailModule } from '../mail/mail.module';
import { RabbitController } from './rabbit.controller';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('rabbit')
    ),
    MailModule,
  ],
  providers: [RabbitService, MailService],
  controllers: [RabbitController],
  exports: [RabbitService],
})
export class RabbitModule {}
