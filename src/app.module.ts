import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './database/data_source';

import { ProductsModule } from './module/product/product.module';
import { CategoriesModule } from './module/categories/categories.module';
import { WarehouseModule } from './module/warehouse/warehouse.module';
import { OrderModule } from './module/order/order.module';
import { OrderDetailModule } from './module/order-detail/order-detail.module';
import { DiscountModule } from './module/discount/discount.module';
import { StockTransactionModule } from './module/stock-transaction/stock-transition.module';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/auth/users/user.module';
import { RoleModule } from './module/auth/role/role.module';
import { PermissionModule } from './module/auth/permission/permission.module';
import { UserAddressModule } from './module/address/user_address.module';
import { ProductDiscountModule } from './module/product_discount/product_discount.module';
import { ProductImageModule } from './module/prod_image/prod_image.module';
import { ListTitleModule } from './module/list_title/list_title.module';
import { ProductListingModule } from './module/product_listing/product_listing.module';
import { TelegramModule } from './module/telegram/telegram.module';

// Auth & RBAC modules

@Module({
  imports: [
    // Database connection
    TypeOrmModule.forRoot(AppDataSource.options),

    // Feature modules
    ProductsModule,
    CategoriesModule,
    WarehouseModule,
    StockTransactionModule,
    OrderModule,
    OrderDetailModule,
    DiscountModule,
    UserAddressModule,
    ProductDiscountModule,
    ProductImageModule,
    ListTitleModule,
    ProductListingModule,

    // Authentication & authorization
    AuthModule,
    UserModule,
    RoleModule,
    PermissionModule,
    TelegramModule


  ],
})
export class AppModule { }