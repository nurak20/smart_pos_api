import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    HttpCode,
    HttpStatus,
    UseGuards,
} from '@nestjs/common';

import { PermissionsGuard } from '../auth/permission/permission.guard';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { Permissions } from '../auth/permission/permission.decorator';
import { ProductImageService } from './prod_image.service';
import { ProductImage } from './prod_image.entity';
import { ApiResponse } from 'src/extension/api_respone';
import { CreateProductImageDto } from './dto/create_prod_image.dto';
import { UpdateProductImageDto } from './dto/update_prod_image.dto';

@Controller('v1/product-images')
// @UseGuards(JwtAuthGuard, PermissionsGuard)
export class ProductImageController {
    constructor(
        private readonly service: ProductImageService,
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body() dto: CreateProductImageDto,
    ): Promise<ApiResponse<ProductImage>> {
        const data = await this.service.create(dto);
        return new ApiResponse(true, data, 'Product image created successfully');
    }

    @Get()
    // @Permissions('product-image.read')
    async findAll(): Promise<ApiResponse<ProductImage[]>> {
        const data = await this.service.findAll();
        return new ApiResponse(true, data, 'Product images retrieved successfully');
    }

    @Get(':id')
    async findOne(
        @Param('id') id: string,
    ): Promise<ApiResponse<ProductImage>> {
        const data = await this.service.findOne(id);
        return new ApiResponse(true, data, 'Product image retrieved successfully');
    }

    @Get('by-product/:product_id')
    async findByProductId(
        @Param('product_id') product_id: string,
    ): Promise<ApiResponse<ProductImage[]>> {
        const data = await this.service.findByProductId(product_id);
        return new ApiResponse(true, data, 'Product images by product retrieved successfully');
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateProductImageDto,
    ): Promise<ApiResponse<ProductImage>> {
        const data = await this.service.update(id, dto);
        return new ApiResponse(true, data, 'Product image updated successfully');
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(
        @Param('id') id: string,
    ): Promise<ApiResponse<null>> {
        await this.service.remove(id);
        return new ApiResponse(true, null, 'Product image deleted successfully');
    }
}