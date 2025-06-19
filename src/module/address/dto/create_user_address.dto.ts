import { IsUUID, IsString, IsOptional } from 'class-validator';

export class CreateUserAddressDto {
    @IsUUID()
    user_id: string;

    @IsString()
    address: string;

    @IsString()
    lat_lng: string;

    @IsString()
    @IsOptional()
    created_by?: string;
}
