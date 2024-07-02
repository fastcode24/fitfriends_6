import { Module } from '@nestjs/common';
import { FileStorageService } from './file-storage.service';
import { FileStorageController } from './file-storage.controller';
import { FileStorageRepository } from './file-storage.repository';
import { PrismaClientModule } from 'src/libs/models';
import { HttpModule } from '@nestjs/axios';
import { HttpClientParam } from 'src/app.const';

@Module({
  imports: [
    PrismaClientModule,
    HttpModule.register({
      timeout: HttpClientParam.Timeout,
      maxRedirects: HttpClientParam.MaxRedirect,
    }),
  ],
  controllers: [FileStorageController],
  providers: [FileStorageRepository, FileStorageService],
  exports: [FileStorageService],
})
export class FileStorageModule {}
