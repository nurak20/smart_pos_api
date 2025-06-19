import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../product/product.entity';
import { StockTransactionService } from './stock-transaction.service';
import { StockTransactionController } from './stock-transaction.controller';
import { StockTransaction } from './entities/stock-transaction.entity/stock-transaction.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([StockTransaction, Product])
    ],
    providers: [StockTransactionService],
    controllers: [StockTransactionController],
    exports: [StockTransactionService]
})
export class StockTransactionModule { }