import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { UserAddress } from './user_address.entity';
import { CreateUserAddressDto } from './dto/create_user_address.dto';
import { UpdateUserAddressDto } from './dto/update_user_address.dto';


@Injectable()
export class UserAddressService {
    constructor(
        @InjectRepository(UserAddress)
        private readonly repo: Repository<UserAddress>,
    ) { }

    async create(dto: CreateUserAddressDto): Promise<UserAddress> {
        return this.repo.save(dto);
    }

    async findAll(): Promise<UserAddress[]> {
        return this.repo.find();
    }

    async findOne(address_id: string): Promise<UserAddress | null> {
        return this.repo.findOneBy({ address_id });
    }

    async findByUserId(user_id: string): Promise<UserAddress[]> {
        return this.repo.find({ where: { user_id } });
    }

    async search(term: string): Promise<UserAddress[]> {
        return this.repo
            .createQueryBuilder('ua')
            .where('ua.address ILIKE :term', { term: `%${term}%` })
            .orWhere('ua.lat_lng ILIKE :term', { term: `%${term}%` })
            .getMany();
    }

    async update(
        address_id: string,
        dto: UpdateUserAddressDto,
    ): Promise<UpdateResult> {
        return this.repo.update(address_id, dto);
    }

    async remove(address_id: string): Promise<DeleteResult> {
        return this.repo.delete(address_id);
    }
}
