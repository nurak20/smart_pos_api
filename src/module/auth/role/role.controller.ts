import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.entity';
import { CreateRoleDto } from './dto/create_role.dto';
import { UpdateRoleDto } from './dto/update_role.dto';

@Controller('roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @Post()
    create(@Body() dto: CreateRoleDto): Promise<Role> {
        return this.roleService.create(dto);
    }

    @Get()
    findAll(): Promise<Role[]> {
        return this.roleService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Role> {
        return this.roleService.findOne(id);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() dto: UpdateRoleDto,
    ): Promise<Role> {
        return this.roleService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.roleService.remove(id);
    }
}