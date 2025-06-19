import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString } from 'class-validator';

export class CreateProductDiscountDto {
    @ApiProperty({ format: 'uuid' })
    @IsUUID()
    productId: string;

    @ApiProperty({ format: 'uuid' })
    @IsUUID()
    discountId: string;

    @ApiProperty({ default: 'active' })
    @IsString()
    status: string;

    @ApiProperty({ format: 'uuid' })
    @IsUUID()
    createdBy: string;

    @ApiProperty({ format: 'uuid' })
    @IsUUID()
    updatedBy: string;
}
