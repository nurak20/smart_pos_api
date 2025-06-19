import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDiscount } from './product_discount.entity';
import { CreateProductDiscountDto } from './dto/create_product_discount.dto';
import { UpdateProductDiscountDto } from './dto/update_product_discount.dto';
import { DiscountService } from '../discount/discount.service';


@Injectable()
export class ProductDiscountService {
    constructor(
        @InjectRepository(ProductDiscount)
        private readonly repo: Repository<ProductDiscount>,


        private readonly discountService: DiscountService,
    ) { }

    async create(dto: CreateProductDiscountDto): Promise<ProductDiscount> {
        const entity = this.repo.create(dto);
        return this.repo.save(entity);
    }

    findAll(): Promise<ProductDiscount[]> {
        return this.repo.find();
    }

    async findOne(id: string): Promise<ProductDiscount> {
        const found = await this.repo.findOneBy({ id });
        if (!found) throw new NotFoundException(`Link ${id} not found`);
        return found;
    }

    async findByProductId(productId: string): Promise<any> {
        const relation_product_dicount = await this.repo.findOne({
            where: { productId, status: 'active' },
        });
        const dis_id = relation_product_dicount?.discountId;
        if (!dis_id) {
            return null
        }
        const discount = this.discountService.findOne(dis_id);


        return discount;
    }

    async update(
        id: string,
        dto: UpdateProductDiscountDto,
    ): Promise<ProductDiscount> {
        const entity = await this.findOne(id);
        Object.assign(entity, dto);
        return this.repo.save(entity);
    }

    async remove(id: string): Promise<void> {
        const result = await this.repo.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Link ${id} not found`);
        }
    }
}
