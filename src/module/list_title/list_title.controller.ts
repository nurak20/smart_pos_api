// src/module/list-title/list-title.controller.ts
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

import { CreateListTitleDto } from './dto/create_list_title.dto';
import { UpdateListTitleDto } from './dto/update_list_title.dto';
import { ListTitle } from './list_title.entity';
import { ListTitleService } from './list_title.service';
import { ApiResponse } from 'src/extension/api_respone';


@Controller('v1/list-titles')
export class ListTitleController {
    constructor(private readonly service: ListTitleService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body() dto: CreateListTitleDto,
    ): Promise<ApiResponse<ListTitle>> {
        const data = await this.service.create(dto);
        return new ApiResponse<ListTitle>(true, data, 'List title created');
    }
    @Get('products')
    async findAllWithProducts(): Promise<ApiResponse<{ item: any[] }>> {
        const data = await this.service.findAllProductByList();
        // `data` is { item: itemsWithProduct }
        return new ApiResponse(true, data);
    }

    @Get()
    async findAll(): Promise<ApiResponse<ListTitle[]>> {
        const data = await this.service.findAll();
        return new ApiResponse<ListTitle[]>(true, data);
    }

    @Get(':id')
    async findOne(
        @Param('id') id: string,
    ): Promise<ApiResponse<ListTitle>> {
        const data = await this.service.findOne(id);
        return new ApiResponse<ListTitle>(true, data);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateListTitleDto,
    ): Promise<ApiResponse<ListTitle>> {
        const data = await this.service.update(id, dto);
        return new ApiResponse<ListTitle>(true, data, 'List title updated');
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(
        @Param('id') id: string,
    ): Promise<ApiResponse<null>> {
        await this.service.remove(id);
        return new ApiResponse<null>(true, null, 'List title deleted');
    }
}
