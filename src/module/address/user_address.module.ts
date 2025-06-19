import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAddress } from './user_address.entity';
import { UserAddressService } from './user_address.service';
import { UserAddressController } from './user_address.controller';


@Module({
    imports: [
        TypeOrmModule.forFeature([UserAddress]),
    ],
    providers: [UserAddressService],
    controllers: [UserAddressController],
    exports: [UserAddressService],
})
export class UserAddressModule { }
