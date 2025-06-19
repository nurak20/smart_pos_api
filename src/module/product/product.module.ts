// src/products/products.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from './product.entity';
import { ProductsService } from './product.service';
import { ProductsController } from './product.controller';

import { DiscountModule } from '../discount/discount.module';
import { ProductDiscountModule } from '../product_discount/product_discount.module';
import { ProductImageModule } from '../prod_image/prod_image.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),  // makes ProductRepository available
        ProductDiscountModule,
        DiscountModule,
        ProductImageModule                // imports & exports DiscountService + its repo

    ],
    providers: [ProductsService],
    controllers: [ProductsController],
    exports: [ProductsService]
})
export class ProductsModule { }
