import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from 'src/extension/api_respone';
import { ProductDiscountService } from './product_discount.service';
import { CreateProductDiscountDto } from './dto/create_product_discount.dto';
import { ProductDiscount } from './product_discount.entity';
import { UpdateProductDiscountDto } from './dto/update_product_discount.dto';


@Controller('v1/product-discounts')
export class ProductDiscountController {
    constructor(
        private readonly service: ProductDiscountService,
    ) { }

    @Post()
    async create(
        @Body() dto: CreateProductDiscountDto,
    ): Promise<ApiResponse<ProductDiscount>> {
        const data = await this.service.create(dto);
        return new ApiResponse(
            true,
            data,
            'Product–Discount link created successfully',
        );
    }

    @Get()
    async findAll(): Promise<ApiResponse<ProductDiscount[]>> {
        const data = await this.service.findAll();
        return new ApiResponse(true, data);
    }

    @Get(':id')
    async findOne(
        @Param('id') id: string,
    ): Promise<ApiResponse<ProductDiscount>> {
        const data = await this.service.findOne(id);
        return new ApiResponse(true, data);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateProductDiscountDto,
    ): Promise<ApiResponse<ProductDiscount>> {
        const data = await this.service.update(id, dto);
        return new ApiResponse(
            true,
            data,
            'Product–Discount link updated successfully',
        );
    }

    @Delete(':id')
    async remove(
        @Param('id') id: string,
    ): Promise<ApiResponse<null>> {
        await this.service.remove(id);
        return new ApiResponse(
            true,
            null,
            'Product–Discount link removed successfully',
        );
    }
}
