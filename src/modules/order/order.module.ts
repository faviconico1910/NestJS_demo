import { Module } from '@nestjs/common';
import { OrderController } from './presenter/order.controller';
import { OrderService } from './application/order.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
