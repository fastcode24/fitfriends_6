import { Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { BalanceController } from './balance.controller';
import { PrismaClientModule } from 'src/libs/models';
import { HttpModule } from '@nestjs/axios';
import { HttpClientParam } from 'src/app.const';
import { BalanceRepository } from './balance.repository';
import { TrainingModule } from '../training/training.module';

@Module({
  imports: [
    TrainingModule,
    PrismaClientModule,
    HttpModule.register({
      timeout: HttpClientParam.Timeout,
      maxRedirects: HttpClientParam.MaxRedirect,
    }),
  ],
  controllers: [BalanceController],
  providers: [BalanceService, BalanceRepository],
  exports: [BalanceService],
})
export class BalanceModule {}
