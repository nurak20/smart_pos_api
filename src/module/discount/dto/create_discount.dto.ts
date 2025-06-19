import { IsString, IsNumber, IsDateString, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDiscountDto {
    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    discountType: string;

    @ApiProperty()
    @IsNumber()
    value: number;

    @ApiProperty()
    @IsDateString()
    startDate: string;

    @ApiProperty()
    @IsDateString()
    endDate: string;

    @ApiProperty({ default: true })
    @IsBoolean()
    @IsOptional()
    active?: boolean;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    createdBy?: string;
}