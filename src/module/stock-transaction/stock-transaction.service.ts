import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateStockTransactionDto } from './dto/create-stock-transaction.dto';
import { UpdateStockTransactionDto } from './dto/update-stock-transaction.dto';
import { Product } from '../product/product.entity';
import { StockTransaction } from './entities/stock-transaction.entity/stock-transaction.entity';

@Injectable()
export class StockTransactionService {
    constructor(
        @InjectRepository(StockTransaction)
        private readonly repo: Repository<StockTransaction>,
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>,
    ) { }

    // Create a transaction and update product stock
    async create(dto: CreateStockTransactionDto): Promise<StockTransaction> {
        const product = await this.productRepo.findOneBy({ product_id: dto.product_id });
        if (!product) throw new NotFoundException(`Product ${dto.product_id} not found`);

        // Adjust stock
        if (dto.transaction_type === 'IN') {
            product.stock += dto.quantity;
        } else if (dto.transaction_type === 'OUT') {
            if (product.stock < dto.quantity) {
                throw new BadRequestException('Insufficient product stock');
            }
            product.stock -= dto.quantity;
        }

        // Save updated product stock
        await this.productRepo.save(product);

        // Save transaction record
        const stt = this.repo.create(dto);
        return this.repo.save(stt);
    }

    findAll(): Promise<StockTransaction[]> {
        return this.repo.find();
    }

    async findOne(id: string): Promise<StockTransaction> {
        const stt = await this.repo.findOneBy({ stt_id: id });
        if (!stt) throw new NotFoundException(`Transaction ${id} not found`);
        return stt;
    }

    async update(id: string, dto: UpdateStockTransactionDto): Promise<StockTransaction> {
        const stt = await this.findOne(id);
        Object.assign(stt, dto);
        return this.repo.save(stt);
    }

    async remove(id: string): Promise<void> {
        const result = await this.repo.delete({ stt_id: id });
        if (result.affected === 0) throw new NotFoundException(`Transaction ${id} not found`);
    }
}