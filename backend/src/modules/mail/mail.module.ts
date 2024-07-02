import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import { MailConfigModule, getRabbitMQOptions } from 'src/libs/config';
import { getMailOptions } from 'src/libs/config/mail/get-mail-options';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    MailerModule.forRootAsync(getMailOptions()),
    MailConfigModule,
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('rabbit')
    ),
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
