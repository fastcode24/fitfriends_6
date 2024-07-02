import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RefreshTokenModule } from './modules/refresh-token/refresh-token.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './libs/guards';
import { AppConfigModule } from './libs/config';
import { FriendsModule } from './modules/friends/friends.module';
import { TrainingModule } from './modules/training/training.module';
import { ReviewModule } from './modules/review/review.module';
import { BookingModule } from './modules/booking/booking.module';
import { OrderModule } from './modules/order/order.module';
import { BalanceModule } from './modules/balance/balance.module';
import { NotifyModule } from './modules/notify/notify.module';
import { SubscribeModule } from './modules/subscribe/subscribe.module';
import { FileStorageModule } from './modules/file-storage/file-storage.module';
import { MailModule } from './modules/mail/mail.module';
import { RabbitModule } from './modules/rabbit/rabbit.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    UserModule,
    FriendsModule,
    TrainingModule,
    ReviewModule,
    BookingModule,
    BalanceModule,
    OrderModule,
    NotifyModule,
    RabbitModule,
    SubscribeModule,
    MailModule,
    FileStorageModule,
    AppConfigModule,
    AuthModule,
    RefreshTokenModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
