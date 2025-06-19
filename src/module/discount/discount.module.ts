import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discount } from './discount.entity';
import { DiscountController } from './discount.controller';
import { DiscountService } from './discount.service';
import { ProductDiscount } from '../product_discount/product_discount.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Discount, ProductDiscount])],  // ← registers DiscountRepository
    providers: [DiscountService],
    controllers: [DiscountController],
    exports: [DiscountService],
    // ← exports both the service (and its repo)
})
export class DiscountModule { }