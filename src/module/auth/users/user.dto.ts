import { IsString, IsEmail, MinLength, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty({ minLength: 6 })
    @MinLength(6)
    password: string;

    @ApiProperty({ type: [String], required: false })
    @IsOptional()
    @IsUUID('all', { each: true })
    roles?: string[];
}