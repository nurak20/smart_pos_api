import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('order_detail')
export class OrderDetail {
    @PrimaryGeneratedColumn('uuid')
    od_id: string;

    @Column({ type: 'uuid' })
    order_id: string;

    @Column({ length: 100 })
    product_code: string;

    @Column({ type: 'int' })
    qty: number;

    @Column({ type: 'decimal' })
    price: number;

    @Column({ type: 'decimal', nullable: true })
    discount?: number;

    @Column({ length: 50, nullable: true })
    discount_unit?: string;

    @Column({ type: 'decimal', nullable: true })
    discount_amount?: number;

    @Column({ type: 'decimal' })
    sub_total: number;

    @Column({ type: 'decimal' })
    total_usd: number;

    @Column({ type: 'decimal' })
    total_riel: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_date: Date;

    @Column({ length: 100, nullable: true })
    created_by?: string;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_date: Date;

    @Column({ length: 100, nullable: true })
    updated_by?: string;
}