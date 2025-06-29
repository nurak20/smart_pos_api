import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update_product.dto';
import { DiscountService } from '../discount/discount.service';
import { ProductDiscountService } from '../product_discount/product_discount.service';
import { ProductImageService } from '../prod_image/prod_image.service';


@Injectable()
export class ProductsService {
    constructor(

        private readonly discountService: DiscountService,
        private readonly productDiscountService: ProductDiscountService,
        private readonly productImageService: ProductImageService,

        @InjectRepository(Product)
        private readonly repo: Repository<Product>,


    ) { }

    async create(dto: CreateProductDto): Promise<Product> {
        const product = this.repo.create(dto);
        return this.repo.save(product);
    }

    findAll(): Promise<Product[]> {
        return this.repo.find();
    }

    async findOne(id: string): Promise<Product> {
        const product = await this.repo.findOneBy({ product_id: id });
        if (!product) throw new NotFoundException(`Product ${id} not found`);
        return product;
    }

    async addToCart(
        productId: string,
        quantity: number,
    ): Promise<{
        itemId: string;
        quantity: number;
        unitPrice: number;
        totalPrice: number;
        discountAmount: number;
        finalPrice: number;
        image_url: any,
        product_name: string
    }> {
        // 1) Load product and verify it exists
        const product = await this.repo.findOneBy({ product_id: productId });
        if (!product) {
            throw new NotFoundException(`Product ${productId} not found`);
        }

        // 2) Calculate raw totals
        const unitPrice = product.selling_price;              // <-- assumes your entity has a `price` column
        const totalPrice = unitPrice * quantity;
        const url = product.image_url
        const name = product.product_name

        // 3) Ask DiscountService how much discount to apply
        const discountAmount = await this.discountService.calculate(
            productId,
            quantity,
            unitPrice
        );

        // 4) Compute final price after discount
        const finalPrice = totalPrice - discountAmount;

        // 5) Return a “cart line” object
        return {
            itemId: productId,
            quantity,
            unitPrice,
            totalPrice,
            discountAmount,
            finalPrice,
            image_url: url,
            product_name: name,

        };
    }

    async update(id: string, dto: UpdateProductDto): Promise<Product> {
        const product = await this.findOne(id);
        Object.assign(product, dto);
        return this.repo.save(product);
    }

    async getProductDetail(productId: string): Promise<any> {
        try {
            // 1) Load product
            const product = await this.repo.findOneBy({ product_id: productId });
            if (!product) {
                throw new NotFoundException(`Product ${productId} not found`);
            }

            // Parse and protect unit price
            const unitPrice =
                parseFloat(product.selling_price?.toString() || '0') || 0;

            // 2) Fetch discount rules
            const discounts =
                (await this.productDiscountService.findByProductId(productId)) || {};

            // Safely extract discount fields
            const promotion_title =
                typeof discounts.title === 'string' ? discounts.title : null;
            const discount_type =
                typeof discounts.discountType === 'string'
                    ? discounts.discountType
                    : null;
            const discounts_value = discounts.value;

            // 3) Calculate discount price for quantity = 1
            const discount_price =
                (await this.discountService.calculate(productId, 1, unitPrice)) || 0;
            const final_price = unitPrice - discount_price;

            // 4) Fetch images
            const images =
                (await this.productImageService.getImagesByProductId(productId)) || [];

            const simplified = images.map((img) => ({
                alt: img?.image_name ?? '',
                image_url: img?.image_url ?? '',
            }));

            // 5) Return response safely
            return {
                product_data: {
                    ...product,
                    selling_price: unitPrice, // ensure clean float
                },
                pricing_list: {
                    selling_price: unitPrice,
                    discount_price,
                    final_price,
                },
                discount_data: {
                    promotion_title,
                    discount_type,
                    discounts_value,
                },
                image_data: simplified,
            };
        } catch (err) {
            console.error('Error in getProductDetail:', err);
            if (err instanceof NotFoundException) {
                throw err;
            }
            throw new InternalServerErrorException('Failed to load product details');
        }
    }

    async remove(id: string): Promise<void> {
        const result = await this.repo.delete({ product_id: id });
        if (result.affected === 0) {
            throw new NotFoundException(`Product ${id} not found`);
        }
    }
}