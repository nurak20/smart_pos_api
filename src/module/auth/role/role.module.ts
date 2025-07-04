import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { PermissionModule } from '../permission/permission.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Role]),
        PermissionModule,
    ],
    controllers: [RoleController],
    providers: [RoleService],
    exports: [RoleService, TypeOrmModule],  // Export the repository module so RoleRepository is available externally
})
export class RoleModule { }