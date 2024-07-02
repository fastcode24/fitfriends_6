import { Module } from '@nestjs/common';
import { TrainingService } from './training.service';
import { TrainingController } from './training.controller';
import { UserModule } from '../user/user.module';
import { HttpModule } from '@nestjs/axios';
import { PrismaClientModule } from 'src/libs/models';
import { HttpClientParam } from 'src/app.const';
import { TrainingRepository } from './training.repository';
import { SubscribeService } from '../subscribe/subscribe.service';
import { SubscribeModule } from '../subscribe/subscribe.module';
import { MailModule } from '../mail/mail.module';
import { MailService } from '../mail/mail.service';
import { RabbitService } from '../rabbit/rabbit.service';
import { RabbitModule } from '../rabbit/rabbit.module';
import { UserService } from '../user/user.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from 'src/libs/config';

@Module({
  imports: [
    PrismaClientModule,
    UserModule,
    SubscribeModule,
    MailModule,
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
  controllers: [TrainingController],
  providers: [TrainingService, TrainingRepository, SubscribeService, MailService, RabbitService, UserService],
  exports: [TrainingService],
})
export class TrainingModule {}
