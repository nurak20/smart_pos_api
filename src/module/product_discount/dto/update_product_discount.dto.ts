import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsString, IsOptional } from 'class-validator';

export class UpdateProductDiscountDto {
    @ApiPropertyOptional({ format: 'uuid' })
    @IsUUID()
    @IsOptional()
    productId?: string;

    @ApiPropertyOptional({ format: 'uuid' })
    @IsUUID()
    @IsOptional()
    discountId?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    status?: string;

    @ApiPropertyOptional({ format: 'uuid' })
    @IsUUID()
    @IsOptional()
    updatedBy?: string;
}
