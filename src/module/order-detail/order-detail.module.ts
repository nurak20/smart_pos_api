import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetailService } from './order-detail.service';
import { OrderDetailController } from './order-detail.controller';
import { OrderDetail } from './order-detail.entity';

@Module({
    imports: [TypeOrmModule.forFeature([OrderDetail])],
    providers: [OrderDetailService],
    controllers: [OrderDetailController],
    exports: [OrderDetailService],
})
export class OrderDetailModule { }