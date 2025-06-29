import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Role } from '../role/role.entity';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    user_id: string;
    @Column({ nullable: true })
    first_name: string;

    @Column({ nullable: true })
    last_name: string;

    @Column({ unique: true })
    username: string;


    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    image_url: string;

    @ManyToMany(() => Role, (role) => role.users, { eager: true })
    @JoinTable({ name: 'user_roles' })
    roles: Role[];

    @CreateDateColumn()
    created_date: Date;

    @UpdateDateColumn()
    updated_date: Date;

    @Column({ default: true })
    status: boolean;
}