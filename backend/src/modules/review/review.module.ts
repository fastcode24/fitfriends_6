import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PrismaClientModule } from 'src/libs/models';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { ReviewRepository } from './review.repository';
import { HttpClientParam } from 'src/app.const';
import { TrainingService } from '../training/training.service';
import { TrainingModule } from '../training/training.module';
import { TrainingRepository } from '../training/training.repository';
import { SubscribeService } from '../subscribe/subscribe.service';
import { MailService } from '../mail/mail.service';
import { RabbitService } from '../rabbit/rabbit.service';
import { UserService } from '../user/user.service';
import { RabbitModule } from '../rabbit/rabbit.module';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from 'src/libs/config';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    PrismaClientModule,
    TrainingModule,
    UserModule,
    RabbitModule,
    HttpModule.register({
      timeout: HttpClientParam.Timeout,
      maxRedirects: HttpClientParam.MaxRedirect
    }),
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('rabbit')
    ),
  ],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository, TrainingService, TrainingRepository, SubscribeService, MailService, RabbitService, UserService],
  exports: [ReviewService],
})
export class ReviewModule {}
