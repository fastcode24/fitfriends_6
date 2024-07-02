import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { HttpModule } from '@nestjs/axios';
import { SubscribeService } from './subscribe.service';
import { SubscribeController } from './subscribe.controller';
import { PrismaClientModule } from 'src/libs/models';
import { HttpClientParam } from 'src/app.const';
import { UserModule } from '../user/user.module';
import { MailModule } from '../mail/mail.module';
import { getRabbitMQOptions } from 'src/libs/config';
import { RabbitService } from '../rabbit/rabbit.service';
import { RabbitModule } from '../rabbit/rabbit.module';

@Module({
  imports: [
    PrismaClientModule,
    MailModule,
    UserModule,
    RabbitModule,
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('rabbit')
    ),
    HttpModule.register({
      timeout: HttpClientParam.Timeout,
      maxRedirects: HttpClientParam.MaxRedirect,
    }),
  ],
  controllers: [SubscribeController],
  providers: [SubscribeService, RabbitService]
})
export class SubscribeModule {}
