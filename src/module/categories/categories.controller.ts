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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto/create-category.dto';
import { Category } from './entities/category.entity/category.entity';
import { ApiResponse } from 'src/extension/api_respone';
import { UpdateCategoryDto } from './dto/update-category.dto/update-category.dto';


@Controller('categories')
export class CategoriesController {
    constructor(private readonly service: CategoriesService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body() dto: CreateCategoryDto,
    ): Promise<ApiResponse<Category>> {
        const data = await this.service.create(dto);
        return new ApiResponse(true, data, 'Category created successfully ');
    }

    @Get()
    async findAll(): Promise<ApiResponse<Category[]>> {
        const data = await this.service.findAll();
        return new ApiResponse(true, data, 'Categories retrieved successfully');
    }

    @Get(':id')
    async findOne(
        @Param('id') id: string,
    ): Promise<ApiResponse<Category>> {
        const data = await this.service.findOne(id);
        return new ApiResponse(true, data, 'Category retrieved successfully');
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateCategoryDto,
    ): Promise<ApiResponse<Category>> {
        const data = await this.service.update(id, dto);
        return new ApiResponse(true, data, 'Category updated successfully');
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(
        @Param('id') id: string,
    ): Promise<ApiResponse<null>> {
        await this.service.remove(id);
        return new ApiResponse(true, null, 'Category deleted successfully');
    }
}
