// src/module/product-listing/product-listing.controller.ts
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
} from '@nestjs/common';

import { CreateProductListingDto } from './dto/create_product_listing.dto';
import { UpdateProductListingDto } from './dto/update_product_listing.dto';
import { ProductListingService } from './product_listing.service';
import { ApiResponse } from 'src/extension/api_respone';
import { ProductListing } from './product_listing.entity';


@Controller('v1/product-listings')
export class ProductListingController {
    constructor(private readonly service: ProductListingService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body() dto: CreateProductListingDto,
    ): Promise<ApiResponse<ProductListing>> {
        const data = await this.service.create(dto);
        return new ApiResponse<ProductListing>(true, data, 'Product listing created');
    }

    @Get()
    async findAll(): Promise<ApiResponse<ProductListing[]>> {
        const data = await this.service.findAll();
        return new ApiResponse<ProductListing[]>(true, data);
    }
    @Get('list/:listId')
    async findByListId(
        @Param('listId') listId: string,
    ): Promise<ApiResponse<ProductListing[]>> {
        const data = await this.service.findByListId(listId);
        return new ApiResponse<ProductListing[]>(true, data);
    }

    @Get(':id')
    async findOne(
        @Param('id') id: string,
    ): Promise<ApiResponse<ProductListing>> {
        const data = await this.service.findOne(id);
        return new ApiResponse<ProductListing>(true, data);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateProductListingDto,
    ): Promise<ApiResponse<ProductListing>> {
        const data = await this.service.update(id, dto);
        return new ApiResponse<ProductListing>(true, data, 'Product listing updated');
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(
        @Param('id') id: string,
    ): Promise<ApiResponse<null>> {
        await this.service.remove(id);
        return new ApiResponse<null>(true, null, 'Product listing deleted');
    }
}
