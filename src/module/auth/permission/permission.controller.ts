import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { Permission } from './permission.entity';
import { CreatePermissionDto } from './dto/create_permssion.dto';

@Controller('permissions')
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) { }

    @Post()
    create(@Body() dto: CreatePermissionDto): Promise<Permission> {
        return this.permissionService.create(dto);
    }

    @Get()
    findAll(): Promise<Permission[]> {
        return this.permissionService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Permission> {
        return this.permissionService.findOne(id);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() dto: Partial<CreatePermissionDto>,
    ): Promise<Permission> {
        return this.permissionService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.permissionService.remove(id);
    }
}