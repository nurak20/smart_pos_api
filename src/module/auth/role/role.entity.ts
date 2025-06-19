import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
} from 'typeorm';

import { User } from '../users/user.entity';
import { Permission } from '../permission/permission.entity';

@Entity('role')
export class Role {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;

    @ManyToMany(() => Permission, (perm) => perm.roles, { eager: true })
    @JoinTable({ name: 'role_permissions' })
    permissions: Permission[];

    @ManyToMany(() => User, (user) => user.roles)
    users: User[];
}