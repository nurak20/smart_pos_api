import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Product } from 'src/module/product/product.entity';
import { Category } from 'src/module/categories/entities/category.entity/category.entity';
import { Warehouse } from 'src/module/warehouse/entity/warehouse.entity';
import { StockTransaction } from 'src/module/stock-transaction/entities/stock-transaction.entity/stock-transaction.entity';
import { User } from 'src/module/auth/users/user.entity';
import { Role } from 'src/module/auth/role/role.entity';
import { Permission } from 'src/module/auth/permission/permission.entity';
import { UserAddress } from 'src/module/address/user_address.entity';
import { Discount } from 'src/module/discount/discount.entity';
import { ProductDiscount } from 'src/module/product_discount/product_discount.entity';
import { ProductImage } from 'src/module/prod_image/prod_image.entity';
import { ListTitle } from 'src/module/list_title/list_title.entity';
import { ProductListing } from 'src/module/product_listing/product_listing.entity';
import { Order } from 'src/module/order/order.entity';
import { OrderDetail } from 'src/module/order-detail/order-detail.entity';
dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',                   // ← Postgres driver
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT!,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    schema: 'rs_shop',
    entities: [
        Product,
        Category,
        Warehouse,
        StockTransaction,
        User,
        Role,
        Permission,
        UserAddress,
        Discount,
        ProductDiscount,
        ProductImage,
        ListTitle,
        ProductListing,
        Order,
        OrderDetail
        // ProductImage
    ], // track applied migrations here
});
