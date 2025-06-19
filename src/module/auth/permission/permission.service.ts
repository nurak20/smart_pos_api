import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Permission } from './permission.entity';
import { CreatePermissionDto } from './dto/create_permssion.dto';

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(Permission)
        private readonly permRepo: Repository<Permission>,
    ) { }

    /** Create a new permission */
    async create(dto: CreatePermissionDto): Promise<Permission> {
        const perm = this.permRepo.create({ action: dto.action });
        return this.permRepo.save(perm);
    }

    /** List all permissions */
    findAll(): Promise<Permission[]> {
        return this.permRepo.find();
    }

    /** Get a single permission by ID or throw if not found */
    async findOne(id: string): Promise<Permission> {
        const perm = await this.permRepo.findOne({ where: { id } });
        if (!perm) {
            throw new NotFoundException(`Permission ${id} not found`);
        }
        return perm;
    }

    /** Fetch multiple permissions by IDs */
    async findByIds(ids: string[]): Promise<Permission[]> {
        return this.permRepo.find({ where: { id: In(ids) } });
    }

    /** Update a permission */
    async update(id: string, dto: Partial<CreatePermissionDto>): Promise<Permission> {
        await this.permRepo.update(id, { action: dto.action });
        return this.findOne(id);
    }

    /** Delete a permission by ID */
    async remove(id: string): Promise<void> {
        const result = await this.permRepo.delete(id);
        if (!result.affected) {
            throw new NotFoundException(`Permission ${id} not found`);
        }
    }
}
