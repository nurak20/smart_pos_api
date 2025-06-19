// src/module/user-address/user-address.entity.ts
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';      // ← from 'typeorm', not '@nestjs/typeorm'

@Entity('user_address')
export class UserAddress {
    @PrimaryGeneratedColumn('uuid')
    address_id: string;

    @Column('uuid')
    user_id: string;

    @Column('text')
    address: string;

    @Column({ type: 'varchar', length: 255 })
    lat_lng: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    created_by?: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    updated_by?: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_date: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_date: Date;

    @Column({ type: 'boolean', default: true })
    status: boolean;

    @Column({ type: 'boolean', default: false })
    is_disable: boolean;
}
