import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderService } from './order.service';
import { Order } from './order.entity';
import { OrderController } from './order.controller'
import { OrderDetailService } from '../order-detail/order-detail.service';
import { OrderDetailModule } from '../order-detail/order-detail.module';


@Module({
    imports: [TypeOrmModule.forFeature([Order]), OrderDetailModule],
    providers: [OrderService],
    controllers: [OrderController],
    exports: [OrderService],
})
export class OrderModule { }