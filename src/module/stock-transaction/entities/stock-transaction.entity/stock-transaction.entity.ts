import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('stock_transaction')
export class StockTransaction {
    @PrimaryGeneratedColumn('uuid')
    stt_id: string;

    @Column({ type: 'uuid' })
    warehouse_id: string;

    @Column({ type: 'uuid' })
    product_id: string;

    @Column({ length: 10 })
    transaction_type: 'IN' | 'OUT';

    @Column({ type: 'int' })
    quantity: number;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ length: 50, nullable: true })
    reference?: string;

    @Column({ length: 100, nullable: true })
    created_by?: string;

    @Column({ length: 100, nullable: true })
    updated_by?: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_date: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_date: Date;
}