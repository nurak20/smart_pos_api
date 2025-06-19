// src/module/product_listing/product_listing.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { ProductListingService } from './product_listing.service';
import { ProductListingController } from './product_listing.controller';

// Import ListTitleModule and ProductModule circularly
import { ListTitleModule } from '../list_title/list_title.module';
import { ProductListing } from './product_listing.entity';
import { ProductsModule } from '../product/product.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([ProductListing]),
        forwardRef(() => ListTitleModule),
        forwardRef(() => ProductsModule),
    ],
    controllers: [ProductListingController],
    providers: [ProductListingService],
    exports: [ProductListingService],  // so ListTitleModule can inject it
})
export class ProductListingModule { }
