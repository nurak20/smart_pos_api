import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 255 })
    name: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ length: 50, default: 'active' })
    status: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @Column({ length: 100, nullable: true })
    created_by?: string;

    @Column({ length: 100, nullable: true })
    updated_by?: string;

    @Column({ length: 255, nullable: true })
    image?: string;
}