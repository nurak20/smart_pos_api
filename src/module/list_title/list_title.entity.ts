import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('list_title')
export class ListTitle {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'list_title' })
    title: string;

    @Column({ type: 'int' })
    index: number;

    @Column({ name: 'created_by', nullable: true })
    createdBy: string;

    @Column({ name: 'updated_by', nullable: true })
    updatedBy: string;

    @CreateDateColumn({ name: 'created_date' })
    createdDate: Date;

    @UpdateDateColumn({ name: 'updated_date' })
    updatedDate: Date;
}