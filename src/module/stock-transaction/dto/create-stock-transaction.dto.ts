import { IsUUID, IsIn, IsInt, Min, IsOptional, IsString } from 'class-validator';

export class CreateStockTransactionDto {
    @IsUUID()
    warehouse_id: string;

    @IsUUID()
    product_id: string;

    @IsIn(['IN', 'OUT'])
    transaction_type: 'IN' | 'OUT';

    @IsInt()
    @Min(1)
    quantity: number;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    reference?: string;

    @IsString()
    @IsOptional()
    created_by?: string;
}