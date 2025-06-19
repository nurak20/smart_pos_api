import {
  IsUUID,
  IsString,
  IsInt,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDetailDto {
  @IsUUID()
  order_id: string;

  @IsString()
  product_code: string;

  @IsInt()
  @Type(() => Number)
  qty: number;

  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  discount?: number;

  @IsString()
  @IsOptional()
  discount_unit?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  discount_amount?: number;

  @IsNumber()
  @Type(() => Number)
  sub_total: number;

  @IsNumber()
  @Type(() => Number)
  total_usd: number;

  @IsNumber()
  @Type(() => Number)
  total_riel: number;

  @IsString()
  @IsOptional()
  created_by?: string;
}
