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
import { ProductsService } from './product.service';
import { CreateProductDto } from './dto/product.dto';
import { ApiResponse } from 'src/extension/api_respone';
import { Product } from './product.entity';
import { UpdateProductDto } from './dto/update_product.dto';
import { PermissionsGuard } from '../auth/permission/permission.guard';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { Permissions } from '../auth/permission/permission.decorator';


@Controller('v1/products')
// @UseGuards(JwtAuthGuard, PermissionsGuard)
export class ProductsController {
    constructor(
        private readonly service: ProductsService,

    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body() dto: CreateProductDto,
    ): Promise<ApiResponse<Product>> {
        const data = await this.service.create(dto);
        return new ApiResponse(true, data, 'Product created successfully');
    }

    @Post('/add-to-card')
    @HttpCode(HttpStatus.CREATED)
    async addToCart(
        @Body() addToCartBody: { product_id: string; quantity: number }
    ): Promise<ApiResponse<any>> {
        const { product_id, quantity } = addToCartBody;

        // ← await here!
        const data = await this.service.addToCart(product_id, quantity);
        return new ApiResponse(true, data, 'Product added successfully');
    }


    @Get()
    // @Permissions('user.read')
    async findAll(): Promise<ApiResponse<Product[]>> {
        const data = await this.service.findAll();
        return new ApiResponse(true, data, 'Products retrieved successfully');
    }

    @Get(':id')
    async findOne(
        @Param('id') id: string,
    ): Promise<ApiResponse<Product>> {
        const data = await this.service.findOne(id);
        return new ApiResponse(true, data, 'Product retrieved successfully');
    }

    @Get('/product-detail/:id')
    async getProductDetail(
        @Param('id') id: string,
    ): Promise<
        ApiResponse<{
            product: any;
            discounts: any[];
            pricing: { unitPrice: number; discountAmount: number; finalPrice: number };
            images: any[];
        }>
    > {
        const data = await this.service.getProductDetail(id);
        return new ApiResponse(
            true,
            data,
            'Product detail retrieved successfully',
        );
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateProductDto,
    ): Promise<ApiResponse<Product>> {
        const data = await this.service.update(id, dto);
        return new ApiResponse(true, data, 'Product updated successfully');
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(
        @Param('id') id: string,
    ): Promise<ApiResponse<null>> {
        await this.service.remove(id);
        return new ApiResponse(true, null, 'Product deleted successfully');
    }
}
