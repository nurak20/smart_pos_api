import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create_order.dto';
import { Order } from './order.entity';
import { UpdateOrderDto } from './dto/update_order.dto';
import { OrderDetailService } from '../order-detail/order-detail.service';
import { CreateOrderRequest } from './dto/generate_invoice.dto';


@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly repo: Repository<Order>,

        private readonly orderDetailService: OrderDetailService,
    ) { }

    async create(dto: CreateOrderDto): Promise<Order> {
        const entity = this.repo.create(dto);
        return this.repo.save(entity);
    }

    findAll(): Promise<Order[]> {
        return this.repo.find();
    }

    async findOne(id: string): Promise<Order> {
        const entity = await this.repo.findOneBy({ order_id: id });
        if (!entity) throw new NotFoundException(`Order ${id} not found`);
        return entity;
    }
    async createInvoice(createOrderRequest: CreateOrderRequest): Promise<any> {
        try {
            // Validate that required fields are present
            if (!createOrderRequest.order.order_date) {
                throw new Error('Order date is required');
            }

            if (!createOrderRequest.order.total_amount_usd) {
                throw new Error('Total amount USD is required');
            }

            if (!createOrderRequest.order.total_amount_riel) {
                throw new Error('Total amount Riel is required');
            }

            // Set default values for optional fields if not provided
            const orderData = {
                ...createOrderRequest.order,
                delivery_completed: createOrderRequest.order.delivery_completed ?? false,
                delivery_status: createOrderRequest.order.delivery_status ?? 'pending',
                order_status_state: createOrderRequest.order.order_status_state ?? 'pending',
                payment_status: createOrderRequest.order.payment_status ?? 'pending',
                exchange_rate: createOrderRequest.order.exchange_rate ?? 4000, // Set your default exchange rate
            };

            // 1. First create the order
            const order = await this.create(orderData);

            // 2. Then create all order details associated with this order
            const orderDetailsPromises = createOrderRequest.order_detail.map(detail => {
                return this.orderDetailService.create({
                    ...detail,
                    order_id: order.order_id, // Associate with the created order
                });
            });

            // Wait for all order details to be created
            const orderDetails = await Promise.all(orderDetailsPromises);

            // 3. Return the order with its details
            return {
                order_info: order,
                order_details: orderDetails, // Return the actual created details, not promises
            };
        } catch (error) {
            console.error('Error creating invoice:', error);
            throw error;
        }
    }

    async update(id: string, dto: UpdateOrderDto): Promise<Order> {
        const entity = await this.findOne(id);
        Object.assign(entity, dto);
        return this.repo.save(entity);
    }

    async remove(id: string): Promise<void> {
        const result = await this.repo.delete({ order_id: id });
        if (result.affected === 0) {
            throw new NotFoundException(`Order ${id} not found`);
        }
    }
}