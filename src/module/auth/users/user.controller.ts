import { Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiResponse } from "src/extension/api_respone";
import { User } from "./user.entity";


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {

    }
    @Get()
    async getUserDetails(id: string): Promise<ApiResponse<User>> {
        const user = await this.userService.findOne(id);

        return new ApiResponse(true, user, 'User retrieved successfully');
    }
}