import {
    IsUUID,
    IsString,
    IsOptional,
    IsDate,
    IsBoolean,
    IsNumber,
    IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDto {
    @IsUUID()
    @IsOptional()
    address_id?: string;

    @IsUUID()
    @IsOptional()
    user_id?: string;

    @IsDate()
    @IsNotEmpty() // Make it explicitly required
    @Type(() => Date)
    order_date: Date;

    @IsNumber()
    @IsNotEmpty() // Make it explicitly required
    total_amount_usd: number;

    @IsNumber()
    @IsNotEmpty() // Make it explicitly required
    total_amount_riel: number;

    @IsNumber()
    @IsOptional()
    exchange_rate?: number;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    delivery_status?: string;

    @IsBoolean()
    @IsOptional()
    delivery_completed?: boolean;

    @IsNumber()
    @IsOptional()
    delivery_cost?: number;

    @IsString()
    @IsOptional()
    order_status_text?: string;

    @IsString()
    @IsOptional()
    order_status_state?: string;

    @IsString()
    @IsOptional()
    payment_status?: string;

    @IsString()
    @IsOptional()
    payment_type?: string;

    @IsNumber()
    @IsOptional()
    discount_amount?: number;

    @IsUUID()
    @IsOptional()
    event_discount_id?: string;

    @IsNumber()
    @IsOptional()
    sub_total?: number;
}