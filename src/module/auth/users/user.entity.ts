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

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

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