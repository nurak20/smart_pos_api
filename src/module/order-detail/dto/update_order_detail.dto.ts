import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDetailDto } from './create_order_detail.dto';


export class UpdateOrderDetailDto extends PartialType(CreateOrderDetailDto) { }
