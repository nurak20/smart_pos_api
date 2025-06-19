import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { CreateDiscountDto } from './create_discount.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDiscountDto extends PartialType(CreateDiscountDto) {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    updatedBy?: string;
}
