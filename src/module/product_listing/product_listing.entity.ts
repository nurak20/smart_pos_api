import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('product_listing')
export class ProductListing {
    @PrimaryGeneratedColumn('uuid')
    productListingId: string;

    @Column({ name: 'list_title_id' })
    listTitleId: string;

    @Column({ name: 'product_id' })
    productId: string;

    @Column({ name: 'created_by', nullable: true })
    createdBy: string;

    @Column({ name: 'updated_by', nullable: true })
    updatedBy: string;

    @CreateDateColumn({ name: 'created_date' })
    createdDate: Date;

    @UpdateDateColumn({ name: 'updated_date' })
    updatedDate: Date;
}