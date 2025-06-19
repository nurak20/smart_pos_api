import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateDiscountDto } from './dto/create_discount.dto';
import { ApiResponse } from 'src/extension/api_respone';
import { Discount } from './discount.entity';
import { UpdateDiscountDto } from './dto/update_discount.dto';

@Controller('discount')
export class DiscountController {
    constructor(private readonly discountService: DiscountService) { }

    @Post()
    async create(
        @Body() createDto: CreateDiscountDto,
    ): Promise<ApiResponse<Discount>> {
        const data = await this.discountService.create(createDto);
        return new ApiResponse(true, data, 'Discount created successfully');
    }

    @Get()
    async findAll(): Promise<ApiResponse<Discount[]>> {
        const data = await this.discountService.findAll();
        return new ApiResponse(true, data);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ApiResponse<Discount>> {
        const data = await this.discountService.findOne(id);
        if (!data) throw new NotFoundException(`Discount ${id} not found`);
        return new ApiResponse(true, data);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateDto: UpdateDiscountDto,
    ): Promise<ApiResponse<Discount>> {
        const data = await this.discountService.update(id, updateDto);
        if (!data) throw new NotFoundException(`Discount ${id} not found`);
        return new ApiResponse(true, data, 'Discount updated successfully');
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<ApiResponse<null>> {
        await this.discountService.remove(id);
        return new ApiResponse(true, null, 'Discount removed successfully');
    }
}