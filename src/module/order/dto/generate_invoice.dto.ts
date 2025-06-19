import { CreateOrderDetailDto } from "src/module/order-detail/dto/create_order_detail.dto";
import { CreateOrderDto } from "./create_order.dto";

export class CreateOrderRequest {
    order: CreateOrderDto;
    order_detail: CreateOrderDetailDto[];
}