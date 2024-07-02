import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './app.config';
import { jwtConfig, mailConfig, rabbitConfig } from '../';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, jwtConfig, rabbitConfig, mailConfig],
    }),
  ],
})
export class AppConfigModule {}
