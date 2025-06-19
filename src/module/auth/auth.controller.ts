import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './users/login.dto';
import { CreateUserDto } from './users/user.dto';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @Post('register')
    register(@Body() dto: CreateUserDto) {
        return this.authService.register(dto);
    }
}