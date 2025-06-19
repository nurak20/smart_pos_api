import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';
import { CreateRoleDto } from './create_role.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
    @ApiProperty({ required: false, type: [String], description: 'Array of permission IDs' })
    @IsOptional()
    @IsUUID('all', { each: true })
    permissions?: string[];
}