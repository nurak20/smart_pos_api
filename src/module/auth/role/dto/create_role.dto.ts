// src/role/dto/create-role.dto.ts
import { IsString, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
    @ApiProperty({ description: 'Unique name of the role' })
    @IsString()
    name: string;

    @ApiProperty({
        type: [String],
        required: false,
        description: 'Array of permission IDs (UUID) to assign',
    })
    @IsOptional()
    @IsUUID('all', { each: true })
    permissions?: string[];
}
