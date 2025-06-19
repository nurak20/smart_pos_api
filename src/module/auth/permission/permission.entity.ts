import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Role } from '../role/role.entity';

@Entity('permission')
export class Permission {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    action: string;

    @ManyToMany(() => Role, (role) => role.permissions)
    roles: Role[];
}