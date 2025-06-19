import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discount } from './discount.entity';
import { CreateDiscountDto } from './dto/create_discount.dto';
import { UpdateDiscountDto } from './dto/update_discount.dto';
import { ProductDiscount } from '../product_discount/product_discount.entity';

@Injectable()
export class DiscountService {
    constructor(
        @InjectRepository(Discount)
        private readonly discountRepository: Repository<Discount>,

        @InjectRepository(ProductDiscount)
        private readonly productDiscountRepo: Repository<ProductDiscount>,
    ) { }

    create(createDto: CreateDiscountDto): Promise<Discount> {
        const discount = this.discountRepository.create(createDto);
        return this.discountRepository.save(discount);
    }



    async calculate(
        productId: string,
        quantity: number,
        unitPrice: number,
    ): Promise<number> {
        // 1) find the active link
        const link = await this.productDiscountRepo.findOne({
            where: { productId, status: 'active' },
        });
        if (!link) return 0;

        // 2) load the Discount record
        const discount = await this.discountRepository.findOneBy({ id: link.discountId });
        if (!discount) return 0;

        // 3) apply your business logic
        if (discount.discountType === 'fixed') {
            // fixed amount per unit
            return discount.value * quantity;
        }

        if (discount.discountType === 'percentage') {
            // percentage off the total price
            return (unitPrice * quantity * discount.value) / 100;
        }

        return 0;
    }

    findAll(): Promise<Discount[]> {
        return this.discountRepository.find();
    }

    findOne(id: string): Promise<Discount | null> {
        return this.discountRepository.findOne({ where: { id } });
    }

    async update(id: string, dto: UpdateDiscountDto): Promise<Discount | null> {
        await this.discountRepository.update(id, dto);
        return this.findOne(id);
    }
    async remove(id: string): Promise<void> {
        await this.discountRepository.delete(id);
    }
}