import { PartialType } from '@nestjs/mapped-types';
import { CreateProductListingDto } from './create_product_listing.dto';


export class UpdateProductListingDto extends PartialType(CreateProductListingDto) { }