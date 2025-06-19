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
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create_order.dto';
import { ApiResponse } from 'src/extension/api_respone';
import { Order } from './order.entity';
import { UpdateOrderDto } from './dto/update_order.dto';
import { CreateOrderRequest } from './dto/generate_invoice.dto';


@Controller('v1/order')
export class OrderController {
    constructor(private readonly service: OrderService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body() dto: CreateOrderDto,
    ): Promise<ApiResponse<Order>> {

        const data = await this.service.create(dto);
        return new ApiResponse(true, data, 'Order created successfully');
    }
    @Post('invoice')
    @HttpCode(HttpStatus.CREATED)
    async createInvoice(
        @Body() createOrderRequest: CreateOrderRequest,
    ): Promise<ApiResponse<any>> {
        const data = await this.service.createInvoice(createOrderRequest);
        return new ApiResponse(
            true,
            data,
            'Order and invoice created successfully'
        );
    }

    @Get()
    async findAll(): Promise<ApiResponse<Order[]>> {
        const data = await this.service.findAll();
        return new ApiResponse(true, data, 'Orders retrieved successfully');
    }

    @Get(':id')
    async findOne(
        @Param('id') id: string,
    ): Promise<ApiResponse<Order>> {
        const data = await this.service.findOne(id);
        return new ApiResponse(true, data, 'Order retrieved successfully');
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateOrderDto,
    ): Promise<ApiResponse<Order>> {
        const data = await this.service.update(id, dto);
        return new ApiResponse(true, data, 'Order updated successfully');
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(
        @Param('id') id: string,
    ): Promise<ApiResponse<null>> {
        await this.service.remove(id);
        return new ApiResponse(true, null, 'Order deleted successfully');
    }
}