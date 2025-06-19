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
import { StockTransactionService } from './stock-transaction.service';
import { CreateStockTransactionDto } from './dto/create-stock-transaction.dto';
import { UpdateStockTransactionDto } from './dto/update-stock-transaction.dto';
import { StockTransaction } from './entities/stock-transaction.entity/stock-transaction.entity';
import { ApiResponse } from 'src/extension/api_respone';


@Controller('stock-transaction')
export class StockTransactionController {
    constructor(private readonly service: StockTransactionService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body() dto: CreateStockTransactionDto,
    ): Promise<ApiResponse<StockTransaction>> {
        const data = await this.service.create(dto);
        return new ApiResponse(true, data, 'Stock transaction created and stock updated');
    }

    @Get()
    async findAll(): Promise<ApiResponse<StockTransaction[]>> {
        const data = await this.service.findAll();
        return new ApiResponse(true, data, 'Transactions retrieved successfully');
    }

    @Get(':id')
    async findOne(
        @Param('id') id: string,
    ): Promise<ApiResponse<StockTransaction>> {
        const data = await this.service.findOne(id);
        return new ApiResponse(true, data, 'Transaction retrieved successfully');
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateStockTransactionDto,
    ): Promise<ApiResponse<StockTransaction>> {
        const data = await this.service.update(id, dto);
        return new ApiResponse(true, data, 'Transaction updated successfully');
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(
        @Param('id') id: string,
    ): Promise<ApiResponse<null>> {
        await this.service.remove(id);
        return new ApiResponse(true, null, 'Transaction deleted successfully');
    }
}
