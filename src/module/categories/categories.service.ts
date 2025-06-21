import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto/update-category.dto';


@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly repo: Repository<Category>,
    ) { }

    async create(dto: CreateCategoryDto): Promise<Category> {
        const entity = this.repo.create(dto);
        return this.repo.save(entity);
    }

    findAll(): Promise<Category[]> {
        return this.repo.find();
    }

    async findOne(id: string): Promise<Category> {
        const entity = await this.repo.findOneBy({ id });
        if (!entity) throw new NotFoundException(`Category ${id} not found `);
        return entity;
    }

    async update(id: string, dto: UpdateCategoryDto): Promise<Category> {
        const entity = await this.findOne(id);
        Object.assign(entity, dto);
        return this.repo.save(entity);
    }

    async remove(id: string): Promise<void> {
        const result = await this.repo.delete({ id });
        if (result.affected === 0) {
            throw new NotFoundException(`Category ${id} not found`);
        }
    }
}