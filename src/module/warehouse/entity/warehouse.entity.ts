import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'warehouse' })
export class Warehouse {
    @PrimaryGeneratedColumn('uuid')
    warehouse_id: string;

    @Column()
    name: string;

    @Column()
    location: string;

    @Column({ nullable: true })
    description?: string;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    created_date: Date;

    @Column({ nullable: true })
    created_by?: string;

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updated_date: Date;

    @Column({ nullable: true })
    updated_by?: string;
}