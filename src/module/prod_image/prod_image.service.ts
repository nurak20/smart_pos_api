// src/product-image/product-image.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductImage } from './prod_image.entity';
import { CreateProductImageDto } from './dto/create_prod_image.dto';
import { UpdateProductImageDto } from './dto/update_prod_image.dto';


@Injectable()
export class ProductImageService {
    constructor(
        @InjectRepository(ProductImage)
        private readonly productImageRepository: Repository<ProductImage>,
    ) { }

    async create(createProductImageDto: CreateProductImageDto): Promise<ProductImage> {
        const productImage = this.productImageRepository.create(createProductImageDto);
        return this.productImageRepository.save(productImage);
    }
    async getImagesByProductId(
        productId: string,
    ): Promise<{
        image_id: string;
        product_id: string;
        image_url: string;
        size: number;
        image_name: string;
    }[]> {
        return this.productImageRepository.find({
            where: { product_id: productId },
            select: ['image_id', 'product_id', 'image_url', 'size', 'image_name'],
            order: { image_id: 'ASC' },  // optional: deterministic ordering
        });
    }

    async findAll(): Promise<ProductImage[]> {
        return this.productImageRepository.find();
    }

    async findOne(image_id: string): Promise<ProductImage> {
        const productImage = await this.productImageRepository.findOneBy({ image_id });

        if (!productImage) {
            throw new NotFoundException(`ProductImage with ID ${image_id} not found`);
        }

        return productImage;
    }

    async update(
        image_id: string,
        updateProductImageDto: UpdateProductImageDto,
    ): Promise<ProductImage> {
        const existing = await this.productImageRepository.findOneBy({ image_id });

        if (!existing) {
            throw new NotFoundException(`ProductImage with ID ${image_id} not found`);
        }

        const productImage = this.productImageRepository.merge(existing, updateProductImageDto);
        return this.productImageRepository.save(productImage);
    }

    async remove(image_id: string): Promise<void> {
        const result = await this.productImageRepository.delete(image_id);
        if (result.affected === 0) {
            throw new NotFoundException(`ProductImage with ID ${image_id} not found`);
        }
    }

    async findByProductId(product_id: string): Promise<ProductImage[]> {
        return this.productImageRepository.find({ where: { product_id } });
    }
}