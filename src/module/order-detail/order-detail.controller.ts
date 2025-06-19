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
import { OrderDetailService } from './order-detail.service';
import { CreateOrderDetailDto } from './dto/create_order_detail.dto';
import { OrderDetail } from './order-detail.entity';
import { ApiResponse } from 'src/extension/api_respone';
import { UpdateOrderDetailDto } from './dto/update_order_detail.dto';

@Controller('order-detail')
export class OrderDetailController {
    constructor(private readonly service: OrderDetailService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body() dto: CreateOrderDetailDto,
    ): Promise<ApiResponse<OrderDetail>> {
        const data = await this.service.create(dto);
        return new ApiResponse(true, data, 'Order detail created successfully');
    }

    @Get()
    async findAll(): Promise<ApiResponse<OrderDetail[]>> {
        const data = await this.service.findAll();
        return new ApiResponse(true, data, 'Order details retrieved successfully');
    }

    @Get(':id')
    async findOne(
        @Param('id') id: string,
    ): Promise<ApiResponse<OrderDetail>> {
        const data = await this.service.findOne(id);
        return new ApiResponse(true, data, 'Order detail retrieved successfully');
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateOrderDetailDto,
    ): Promise<ApiResponse<OrderDetail>> {
        const data = await this.service.update(id, dto);
        return new ApiResponse(true, data, 'Order detail updated successfully');
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(
        @Param('id') id: string,
    ): Promise<ApiResponse<null>> {
        await this.service.remove(id);
        return new ApiResponse(true, null, 'Order detail deleted successfully');
    }
}