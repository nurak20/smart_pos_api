import { IsString, IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateListTitleDto {
    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsInt()
    index: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    createdBy?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    updatedBy?: string;
}