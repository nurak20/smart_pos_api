import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListTitle } from './list_title.entity';
import { CreateListTitleDto } from './dto/create_list_title.dto';
import { UpdateListTitleDto } from './dto/update_list_title.dto';
import { ProductListingService } from '../product_listing/product_listing.service';


@Injectable()
export class ListTitleService {
    constructor(
        @InjectRepository(ListTitle) private repo: Repository<ListTitle>,

        @Inject(forwardRef(() => ProductListingService))
        private readonly prodList: ProductListingService,
    ) { }

    create(dto: CreateListTitleDto): Promise<ListTitle> {
        const entity = this.repo.create(dto);
        return this.repo.save(entity);
    }

    findAll(): Promise<ListTitle[]> {
        return this.repo.find({ order: { index: 'ASC' } });
    }

    async findOne(id: string): Promise<ListTitle> {
        const item = await this.repo.findOne({ where: { id } });
        if (!item) throw new NotFoundException(`ListTitle ${id} not found`);
        return item;
    }
    async findAllProductByList(): Promise<any> {
        const getAllListTitle = await this.findAll();

        const itemsWithProduct = await Promise.all(
            getAllListTitle.map(async (item) => {
                const product = await this.prodList.findByListId(item.id);
                return { ...item, product };
            }),
        );

        return {
            item: itemsWithProduct
        };
    }

    async update(id: string, dto: UpdateListTitleDto): Promise<ListTitle> {
        await this.repo.update(id, dto);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        const res = await this.repo.delete(id);
        if (!res.affected) throw new NotFoundException(`ListTitle ${id} not found`);
    }
}