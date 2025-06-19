// src/role/role.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Role } from './role.entity';
import { PermissionService } from '../permission/permission.service';
import { CreateRoleDto } from './dto/create_role.dto';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepo: Repository<Role>,
        private readonly permissionService: PermissionService,
    ) { }

    /** Fetch multiple Role entities by their IDs (including permissions) */
    async findByIds(ids: string[]): Promise<Role[]> {
        return this.roleRepo.find({
            where: { id: In(ids) },
            relations: ['permissions'],
        });
    }

    /** Create a new role, assigning permissions by ID */
    async create(dto: CreateRoleDto): Promise<Role> {
        const role = this.roleRepo.create({ name: dto.name });
        if (dto.permissions?.length) {
            role.permissions = await this.permissionService.findByIds(dto.permissions);
        }
        return this.roleRepo.save(role);
    }

    /** List all roles with permissions */
    findAll(): Promise<Role[]> {
        return this.roleRepo.find({ relations: ['permissions'] });
    }

    /** Get a single role by ID or throw if not found */
    async findOne(id: string): Promise<Role> {
        const role = await this.roleRepo.findOne({
            where: { id },
            relations: ['permissions'],
        });
        if (!role) throw new NotFoundException(`Role ${id} not found`);
        return role;
    }

    /** Update a role’s name and permissions */
    async update(id: string, dto: Partial<CreateRoleDto>): Promise<Role> {
        await this.roleRepo.update(id, { name: dto.name });
        const role = await this.findOne(id);
        if (dto.permissions) {
            role.permissions = await this.permissionService.findByIds(dto.permissions);
            await this.roleRepo.save(role);
        }
        return role;
    }

    /** Delete a role by ID */
    async remove(id: string): Promise<void> {
        const result = await this.roleRepo.delete(id);
        if (!result.affected) throw new NotFoundException(`Role ${id} not found`);
    }
}
