import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { RoleService } from '../role/role.service';
import { CreateUserDto, UpdateUserDto, ResetPasswordDto } from './user.dto';

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
            first_name: dto.first_name,
            last_name: dto.last_name,
            status: true,
            image_url: dto.image_url,
        });
        if (dto.roles && dto.roles.length) {
            user.roles = await this.roleService.findByIds(dto.roles);
        }
        return this.userRepo.save(user);
    }

    /** Update user information (excluding password) */
    async update(id: string, dto: UpdateUserDto): Promise<User> {
        const user = await this.findOne(id);

        // Check for username/email conflicts if they're being updated
        if (dto.username && dto.username !== user.username) {
            const existingUser = await this.userRepo.findOne({ where: { username: dto.username } });
            if (existingUser) {
                throw new ConflictException('Username already exists');
            }
        }

        if (dto.email && dto.email !== user.email) {
            const existingUser = await this.userRepo.findOne({ where: { email: dto.email } });
            if (existingUser) {
                throw new ConflictException('Email already exists');
            }
        }

        // Update basic fields
        if (dto.username) user.username = dto.username;
        if (dto.email) user.email = dto.email;
        if (dto.first_name !== undefined) user.first_name = dto.first_name;
        if (dto.last_name !== undefined) user.last_name = dto.last_name;
        if (dto.image_url !== undefined) user.image_url = dto.image_url;
        if (dto.status !== undefined) user.status = dto.status;

        // Update roles if provided
        if (dto.roles) {
            user.roles = await this.roleService.findByIds(dto.roles);
        }

        return this.userRepo.save(user);
    }

    /** Reset user password */
    async resetPassword(id: string, dto: ResetPasswordDto): Promise<void> {
        const user = await this.findOne(id);
        const hash = await bcrypt.hash(dto.newPassword, 10);

        await this.userRepo.update(id, { password: hash });
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