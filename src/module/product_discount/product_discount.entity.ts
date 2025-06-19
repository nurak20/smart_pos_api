import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('product_discount')
export class ProductDiscount {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    productId: string;

    @Column('uuid')
    discountId: string;

    @Column({ length: 50 })
    status: string;

    @Column('uuid')
    createdBy: string;

    @Column('uuid')
    updatedBy: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
