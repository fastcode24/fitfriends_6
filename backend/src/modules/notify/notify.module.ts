import { Module } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { NotifyController } from './notify.controller';
import { PrismaClientModule } from 'src/libs/models';
import { HttpModule } from '@nestjs/axios';
import { HttpClientParam } from 'src/app.const';
import { NotifyRepository } from './notify.repository';

@Module({
  imports: [
    PrismaClientModule,
    HttpModule.register({
      timeout: HttpClientParam.Timeout,
      maxRedirects: HttpClientParam.MaxRedirect,
    }),
  ],
  controllers: [NotifyController],
  providers: [NotifyService, NotifyRepository],
  exports: [NotifyService],
})
export class NotifyModule {}
