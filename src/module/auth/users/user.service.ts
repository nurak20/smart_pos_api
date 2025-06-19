// src/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { RoleService } from '../role/role.service';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        private readonly roleService: RoleService,
    ) { }

    /** Create a new user, hashing the password and assigning roles */
    async create(dto: CreateUserDto): Promise<User> {
        const hash = await bcrypt.hash(dto.password, 10);
        const user = this.userRepo.create({
            username: dto.username,
            email: dto.email,
            password: hash,
            status: true,
        });
        if (dto.roles && dto.roles.length) {
            user.roles = await this.roleService.findByIds(dto.roles);
        }
        return this.userRepo.save(user);
    }

    /** Find user by username or email, including roles & permissions */
    async findByUsernameOrEmail(usernameOrEmail: string): Promise<User | null> {
        return this.userRepo.findOne({
            where: [
                { username: usernameOrEmail },
                { email: usernameOrEmail },
            ],
            relations: ['roles', 'roles.permissions'],
        });
    }

    /** Compare plaintext password with stored hash */
    async verifyPassword(user: User, pass: string): Promise<boolean> {
        return bcrypt.compare(pass, user.password);
    }

    /** List all users with their roles and permissions */
    async findAll(): Promise<User[]> {
        return this.userRepo.find({ relations: ['roles', 'roles.permissions'] });
    }

    /** Get a single user by ID or throw if not found */
    async findOne(id: string): Promise<User> {
        const user = await this.userRepo.findOne({
            where: { user_id: id },
            relations: ['roles', 'roles.permissions'],
        });
        if (!user) throw new NotFoundException(`User ${id} not found`);
        return user;
    }

    /** Delete a user by ID or throw if not found */
    async remove(id: string): Promise<void> {
        const result = await this.userRepo.delete(id);
        if (!result.affected) throw new NotFoundException(`User ${id} not found`);
    }
}
