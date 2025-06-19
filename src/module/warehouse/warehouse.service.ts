import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { Warehouse } from './entity/warehouse.entity';

@Injectable()
export class WarehouseService {
    constructor(
        @InjectRepository(Warehouse)
        private readonly warehouseRepo: Repository<Warehouse>,
    ) { }

    async create(dto: CreateWarehouseDto): Promise<Warehouse> {
        const entity = this.warehouseRepo.create(dto);
        return this.warehouseRepo.save(entity);
    }

    async findAll(): Promise<Warehouse[]> {
        return this.warehouseRepo.find();
    }

    async findOne(id: string): Promise<Warehouse> {
        const warehouse = await this.warehouseRepo.findOne({ where: { warehouse_id: id } });
        if (!warehouse) {
            throw new NotFoundException(`Warehouse with ID ${id} not found`);
        }
        return warehouse;
    }

    async update(id: string, dto: UpdateWarehouseDto): Promise<Warehouse> {
        await this.findOne(id);
        await this.warehouseRepo.update(id, dto);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.findOne(id);
        await this.warehouseRepo.delete(id);
    }
}