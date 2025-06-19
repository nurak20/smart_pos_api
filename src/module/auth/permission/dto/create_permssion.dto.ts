import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto {
    @ApiProperty({ description: 'Action name for the permission, e.g. "user.create"' })
    @IsString()
    action: string;
}