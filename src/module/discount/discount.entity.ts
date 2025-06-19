import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'discount' })
export class Discount {
    @PrimaryGeneratedColumn('uuid', { name: 'dis_id' })
    id: string;

    @Column({ length: 255 })
    title: string;

    @Column({ name: 'discount_type', length: 50 })
    discountType: string;

    @Column('decimal', { precision: 10, scale: 2 })
    value: number;

    @Column({ type: 'timestamp', name: 'start_date' })
    startDate: Date;

    @Column({ type: 'timestamp', name: 'end_date' })
    endDate: Date;

    @Column({ default: true })
    active: boolean;

    @CreateDateColumn({ name: 'created_date' })
    createdDate: Date;

    @UpdateDateColumn({ name: 'updated_date' })
    updatedDate: Date;

    @Column({ name: 'created_by', nullable: true })
    createdBy?: string;

    @Column({ name: 'updated_by', nullable: true })
    updatedBy?: string;
}