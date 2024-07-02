import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HttpClientParam } from 'src/app.const';
import { PrismaClientModule } from 'src/libs/models';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { FriendsRepository } from './friends.repository';
import { UserModule } from '../user/user.module';
import { NotifyModule } from '../notify/notify.module';
import { NotifyService } from '../notify/notify.service';
import { NotifyRepository } from '../notify/notify.repository';

@Module({
  imports: [
    PrismaClientModule,
    HttpModule.register({
      timeout: HttpClientParam.Timeout,
      maxRedirects: HttpClientParam.MaxRedirect,
    }),
    UserModule,
    NotifyModule,
  ],
  controllers: [FriendsController],
  providers: [FriendsRepository, FriendsService, NotifyService, NotifyRepository],
  exports: [FriendsService],
})
export class FriendsModule {}
