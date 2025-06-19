
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
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { Warehouse } from './entity/warehouse.entity';
import { ApiResponse } from 'src/extension/api_respone';


@Controller('v1/warehouses')
export class WarehouseController {
    constructor(private readonly service: WarehouseService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body() dto: CreateWarehouseDto,
    ): Promise<ApiResponse<Warehouse>> {
        const data = await this.service.create(dto);
        return new ApiResponse<Warehouse>(true, data, 'Warehouse created successfully');
    }

    @Get()
    async findAll(): Promise<ApiResponse<Warehouse[]>> {
        const data = await this.service.findAll();
        return new ApiResponse<Warehouse[]>(true, data);
    }

    @Get(':id')
    async findOne(
        @Param('id') id: string,
    ): Promise<ApiResponse<Warehouse>> {
        const data = await this.service.findOne(id);
        return new ApiResponse<Warehouse>(true, data);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateWarehouseDto,
    ): Promise<ApiResponse<Warehouse>> {
        const data = await this.service.update(id, dto);
        return new ApiResponse<Warehouse>(true, data, 'Warehouse updated successfully');
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(
        @Param('id') id: string,
    ): Promise<ApiResponse<null>> {
        await this.service.remove(id);
        return new ApiResponse<null>(true, null, 'Warehouse deleted successfully');
    }
}

