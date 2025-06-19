import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAddressDto } from './create_user_address.dto';

export class UpdateUserAddressDto extends PartialType(CreateUserAddressDto) {
    // You can add updated_by here if you want to track who updated
    updated_by?: string;
}
