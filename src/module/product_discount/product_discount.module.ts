import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductDiscount } from './product_discount.entity';
import { ProductDiscountService } from './product_discount.service';
import { ProductDiscountController } from './product_discount.controller';
import { DiscoveryModule } from '@nestjs/core';
import { DiscountModule } from '../discount/discount.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([ProductDiscount]),
        DiscountModule,         // ← now DiscountService is in scope
    ],
    providers: [ProductDiscountService],
    exports: [ProductDiscountService],
})
export class ProductDiscountModule { }
