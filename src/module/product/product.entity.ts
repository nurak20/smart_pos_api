import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    product_id: string;

    @Column({ type: 'uuid', nullable: true })
    category_id?: string;

    @Column()
    code: string;

    @Column({ nullable: true })
    barcode: string;

    @Column()
    product_name: string;

    @Column({ type: 'decimal' })
    cost_price: number;

    @Column({ type: 'int' })
    stock: number;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ nullable: true })
    created_by?: string;

    @Column({ nullable: true })
    updated_by?: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_date: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_date: Date;

    @Column({ type: 'uuid', nullable: true })
    warehouse_id?: string;

    @Column({ nullable: true })
    image_url?: string;

    @Column({ nullable: true })
    group_code?: string;

    @Column({ nullable: true })
    brand_name?: string;

    @Column({ type: 'decimal' })
    selling_price: number;

    @Column({ nullable: true })
    image_display_group?: string;
}