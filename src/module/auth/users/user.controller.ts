import {
    Controller,
    Get,
    Post,
    Put,
    Patch,
    Delete,
    Body,
    Param,
    HttpCode,
    HttpStatus,
    NotFoundException
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, ResetPasswordDto } from './user.dto';
import { User } from './user.entity';

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'User created successfully', type: User })
    @ApiResponse({ status: 400, description: 'Bad request - validation error' })
    @ApiResponse({ status: 409, description: 'Conflict - username or email already exists' })
    async create(@Body() dto: CreateUserDto): Promise<User> {
        return this.userService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'List of all users', type: [User] })
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get user by ID' })
    @ApiParam({ name: 'id', description: 'User UUID' })
    @ApiResponse({ status: 200, description: 'User found', type: User })
    @ApiResponse({ status: 404, description: 'User not found' })
    async findOne(@Param('id') id: string): Promise<User> {
        return this.userService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update user information (excluding password)' })
    @ApiParam({ name: 'id', description: 'User UUID' })
    @ApiResponse({ status: 200, description: 'User updated successfully', type: User })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiResponse({ status: 409, description: 'Conflict - username or email already exists' })
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateUserDto
    ): Promise<User> {
        return this.userService.update(id, dto);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Partially update user information (excluding password)' })
    @ApiParam({ name: 'id', description: 'User UUID' })
    @ApiResponse({ status: 200, description: 'User updated successfully', type: User })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiResponse({ status: 409, description: 'Conflict - username or email already exists' })
    async partialUpdate(
        @Param('id') id: string,
        @Body() dto: UpdateUserDto
    ): Promise<User> {
        return this.userService.update(id, dto);
    }

    @Post(':id/reset-password')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Reset user password' })
    @ApiParam({ name: 'id', description: 'User UUID' })
    @ApiResponse({ status: 204, description: 'Password reset successfully' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiResponse({ status: 400, description: 'Bad request - validation error' })
    async resetPassword(
        @Param('id') id: string,
        @Body() dto: ResetPasswordDto
    ): Promise<void> {
        return this.userService.resetPassword(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete user by ID' })
    @ApiParam({ name: 'id', description: 'User UUID' })
    @ApiResponse({ status: 204, description: 'User deleted successfully' })
    @ApiResponse({ status: 404, description: 'User not found' })
    async remove(@Param('id') id: string): Promise<void> {
        return this.userService.remove(id);
    }

    @Get('search/:usernameOrEmail')
    @ApiOperation({ summary: 'Find user by username or email' })
    @ApiParam({ name: 'usernameOrEmail', description: 'Username or email address' })
    @ApiResponse({ status: 200, description: 'User found', type: User })
    @ApiResponse({ status: 404, description: 'User not found' })
    async findByUsernameOrEmail(@Param('usernameOrEmail') usernameOrEmail: string): Promise<User> {
        const user = await this.userService.findByUsernameOrEmail(usernameOrEmail);
        if (!user) {
            throw new NotFoundException(`User with username or email '${usernameOrEmail}' not found`);
        }
        return user;
    }
}