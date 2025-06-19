import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductListingDto {
    @ApiProperty()
    @IsString()
    listTitleId: string;

    @ApiProperty()
    @IsString()
    productId: string;

    @ApiProperty({ required: false })
    @IsString()
    createdBy?: string;

    @ApiProperty({ required: false })
    @IsString()
    updatedBy?: string;
}