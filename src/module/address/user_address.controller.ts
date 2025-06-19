import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Query,
    Put,
    Delete,
    NotFoundException,
} from '@nestjs/common';
import { CreateUserAddressDto } from './dto/create_user_address.dto';
import { UserAddressService } from './user_address.service';
import { UserAddress } from './user_address.entity';
import { ApiResponse } from 'src/extension/api_respone';
import { UpdateUserAddressDto } from './dto/update_user_address.dto';


@Controller('v1/user-address')
export class UserAddressController {
    constructor(private readonly service: UserAddressService) { }

    @Post()
    async create(
        @Body() dto: CreateUserAddressDto,
    ): Promise<ApiResponse<UserAddress>> {
        const data = await this.service.create(dto);
        return new ApiResponse<UserAddress>(
            true,
            data,
            'User address created successfully',
        );
    }

    @Get()
    async findAll(): Promise<ApiResponse<UserAddress[]>> {
        const data = await this.service.findAll();
        return new ApiResponse<UserAddress[]>(
            true,
            data,
            'Fetched all user addresses',
        );
    }

    @Get('search')
    async search(
        @Query('q') q: string,
    ): Promise<ApiResponse<UserAddress[]>> {
        const data = await this.service.search(q);
        return new ApiResponse<UserAddress[]>(
            true,
            data,
            `Search results for "${q}"`,
        );
    }

    @Get('user/:userId')
    async findByUser(
        @Param('userId') userId: string,
    ): Promise<ApiResponse<UserAddress[]>> {
        const data = await this.service.findByUserId(userId);
        return new ApiResponse<UserAddress[]>(
            true,
            data,
            `Addresses for user ${userId}`,
        );
    }

    @Get(':id')
    async findOne(
        @Param('id') id: string,
    ): Promise<ApiResponse<UserAddress | null>> {
        const data = await this.service.findOne(id);
        if (!data) {
            throw new NotFoundException(`Address ${id} not found`);
        }
        return new ApiResponse<UserAddress>(
            true,
            data,
            data ? 'Address found' : 'Address not found',
        );
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateUserAddressDto,
    ): Promise<ApiResponse<null>> {
        await this.service.update(id, dto);
        return new ApiResponse<null>(true, null, 'Address updated successfully');
    }

    @Delete(':id')
    async remove(
        @Param('id') id: string,
    ): Promise<ApiResponse<null>> {
        await this.service.remove(id);
        return new ApiResponse<null>(true, null, 'Address deleted successfully');
    }
}
