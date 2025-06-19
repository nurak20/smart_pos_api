import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetail } from './order-detail.entity';
import { CreateOrderDetailDto } from './dto/create_order_detail.dto';
import { UpdateOrderDetailDto } from './dto/update_order_detail.dto';


@Injectable()
export class OrderDetailService {
    constructor(
        @InjectRepository(OrderDetail)
        private readonly repo: Repository<OrderDetail>,
    ) { }

    async create(dto: CreateOrderDetailDto): Promise<OrderDetail> {
        const entity = this.repo.create(dto);
        return this.repo.save(entity);
    }

    findAll(): Promise<OrderDetail[]> {
        return this.repo.find();
    }

    async findOne(id: string): Promise<OrderDetail> {
        const entity = await this.repo.findOneBy({ od_id: id });
        if (!entity) throw new NotFoundException(`OrderDetail ${id} not found`);
        return entity;
    }

    async update(id: string, dto: UpdateOrderDetailDto): Promise<OrderDetail> {
        const entity = await this.findOne(id);
        Object.assign(entity, dto);
        return this.repo.save(entity);
    }

    async remove(id: string): Promise<void> {
        const result = await this.repo.delete({ od_id: id });
        if (result.affected === 0) {
            throw new NotFoundException(`OrderDetail ${id} not found`);
        }
    }
}