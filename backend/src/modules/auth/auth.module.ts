import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { getJwtOptions } from 'src/libs/config';
import { UserModule } from 'src/modules/user/user.module';
import { RefreshTokenModule } from 'src/modules/refresh-token/refresh-token.module';
import { JwtAccessStrategy, JwtRefreshStrategy, LocalStrategy } from './strategies';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { RefreshTokenRepository } from '../refresh-token/refresh-token.repository';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    UserModule,
    RefreshTokenModule,
  ],
  providers: [
    AuthService,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    LocalStrategy,
    RefreshTokenService,
    RefreshTokenRepository,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
