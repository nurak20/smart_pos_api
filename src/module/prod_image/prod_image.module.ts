// src/product-image/product-image.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage } from './prod_image.entity';
import { ProductImageController } from './product_image.controller';
import { ProductImageService } from './prod_image.service';


@Module({
    imports: [TypeOrmModule.forFeature([ProductImage])],
    controllers: [ProductImageController],
    providers: [ProductImageService],
    exports: [ProductImageService],
})
export class ProductImageModule { }