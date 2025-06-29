import { IsString, IsEmail, MinLength, IsOptional, IsUUID, IsBoolean } from 'class-validator';
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

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    first_name?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    last_name?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    image_url?: string;

    @ApiProperty({ type: [String], required: false })
    @IsOptional()
    @IsUUID('all', { each: true })
    roles?: string[];
}


export class UpdateUserDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    username?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    first_name?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    last_name?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    image_url?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsBoolean()
    status?: boolean;

    @ApiProperty({ type: [String], required: false })
    @IsOptional()
    @IsUUID('all', { each: true })
    roles?: string[];
}

export class ResetPasswordDto {
    @ApiProperty({ minLength: 6 })
    @MinLength(6)
    @IsString()
    newPassword: string;
}