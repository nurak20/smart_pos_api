// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './users/user.service';
import { LoginDto } from './users/login.dto';
import { CreateUserDto } from './users/user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    /** 
     * Validate credentials and return the full user (without password) 
     */
    private async validateCredentials(usernameOrEmail: string, pass: string) {
        console.log(usernameOrEmail, pass);
        const user = await this.userService.findByUsernameOrEmail(usernameOrEmail);
        if (user && (await this.userService.verifyPassword(user, pass))) {
            const { password, ...rest } = user;
            console.log(rest);
            return rest;
        }
        return null;
    }


    /**
     * Login: validate, then sign a token with roles & permissions
     */
    async login(dto: LoginDto) {
        if (!dto.username || !dto.password) {
            throw new UnauthorizedException('Please provide username and password');
        }
        const user = await this.validateCredentials(dto.username, dto.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        console.log(LoginDto);

        // Extract roles and permissions
        const roles = user.roles.map(r => r.name);
        const permissions = user.roles
            .flatMap(r => r.permissions.map(p => p.action))
            .filter((action, idx, arr) => arr.indexOf(action) === idx);

        // Sign JWT
        const token = this.jwtService.sign({ sub: user.user_id, roles, permissions });

        // Construct response
        return {
            data: {
                user: {
                    id: user.user_id,
                    username: user.username,
                    email: user.email,
                    status: user.status,
                    createdAt: user.created_date,
                    updatedAt: user.updated_date,
                },
                authorization: {
                    roles: user.roles.map(r => r.name),
                    permissions,
                },
            },
            meta: { token },
        };
    }

    async register(dto: CreateUserDto) {
        return this.userService.create(dto);
    }
}
