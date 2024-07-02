import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaClientModule } from 'src/libs/models';
import { HttpModule } from '@nestjs/axios';
import { HttpClientParam } from 'src/app.const';
import { OrderRepository } from './order.repository';
import { TrainingModule } from '../training/training.module';
import { BalanceModule } from '../balance/balance.module';

@Module({
  imports: [
    TrainingModule,
    BalanceModule,
    PrismaClientModule,
    HttpModule.register({
      timeout: HttpClientParam.Timeout,
      maxRedirects: HttpClientParam.MaxRedirect,
    }),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
  exports: [OrderService],
})
export class OrderModule {}
