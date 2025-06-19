// src/product-image/product-image.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ProductImage {
    @PrimaryGeneratedColumn('uuid')
    image_id: string;

    @Column('uuid')
    product_id: string;

    @Column()
    image_url: string;

    @Column('int')
    size: number;

    @Column()
    image_name: string;
}
