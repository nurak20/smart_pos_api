import {
  IsUUID,
  IsString,
  IsOptional,
  IsInt,
  IsNumber,
} from 'class-validator';

export class CreateProductDto {
  @IsUUID()
  @IsOptional()
  category_id?: string;


  @IsString()
  code: string;

  @IsString()
  @IsOptional()
  barcode: string;

  @IsString()
  product_name: string;

  @IsNumber()
  cost_price: number;

  @IsInt()
  stock: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  created_by?: string;

  @IsUUID()
  @IsOptional()
  warehouse_id?: string;

  @IsString()
  @IsOptional()
  image_url?: string;

  @IsString()
  @IsOptional()
  group_code?: string;

  @IsString()
  @IsOptional()
  brand_name?: string;

  @IsNumber()
  selling_price: number;

  @IsString()
  @IsOptional()
  image_display_group?: string;
}