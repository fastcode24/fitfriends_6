import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { PrismaClientModule } from 'src/libs/models';
import { HttpModule } from '@nestjs/axios';
import { HttpClientParam } from 'src/app.const';
import { BookingRepository } from './booking.repository';
import { UserModule } from '../user/user.module';
import { NotifyModule } from '../notify/notify.module';
import { NotifyService } from '../notify/notify.service';
import { NotifyRepository } from '../notify/notify.repository';

@Module({
  imports: [
    UserModule,
    NotifyModule,
    PrismaClientModule,
    HttpModule.register({
      timeout: HttpClientParam.Timeout,
      maxRedirects: HttpClientParam.MaxRedirect,
    }),
  ],
  controllers: [BookingController],
  providers: [BookingService, BookingRepository, NotifyService, NotifyRepository],
  exports: [BookingService],
})
export class BookingModule {}
