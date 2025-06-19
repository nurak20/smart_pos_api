import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('order')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    order_id: string;

    @Column({ type: 'uuid', nullable: true })
    address_id?: string;

    @Column({ type: 'uuid', nullable: true })
    user_id?: string;

    // Make optional with current timestamp default
    @Column({ type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
    order_date?: Date;

    // Make optional with default 0
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, default: 0 })
    total_amount_usd?: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true, default: 0 })
    total_amount_riel?: number;

    @Column({ type: 'decimal', precision: 10, scale: 4, nullable: true, default: 4000 })
    exchange_rate?: number;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ length: 50, nullable: true, default: 'pending' })
    delivery_status?: string;

    @Column({ type: 'boolean', default: false })
    delivery_completed: boolean;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    delivery_cost?: number;

    @Column({ length: 100, nullable: true })
    order_status_text?: string;

    @Column({ length: 50, nullable: true, default: 'pending' })
    order_status_state?: string;

    @Column({ length: 50, nullable: true, default: 'pending' })
    payment_status?: string;

    @Column({ length: 50, nullable: true })
    payment_type?: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, default: 0 })
    discount_amount?: number;

    @Column({ type: 'uuid', nullable: true })
    event_discount_id?: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    sub_total?: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_date: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_date: Date;
}