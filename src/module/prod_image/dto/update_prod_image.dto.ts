import { PartialType } from '@nestjs/mapped-types';
import { CreateProductImageDto } from './create_prod_image.dto';


export class UpdateProductImageDto extends PartialType(CreateProductImageDto) { }