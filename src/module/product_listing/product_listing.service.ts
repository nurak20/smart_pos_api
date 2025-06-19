import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductListing } from './product_listing.entity';
import { CreateProductListingDto } from './dto/create_product_listing.dto';
import { UpdateProductListingDto } from './dto/update_product_listing.dto';
import { ListTitleService } from '../list_title/list_title.service';
import { ProductsService } from '../product/product.service';


@Injectable()
export class ProductListingService {
    constructor(
        @InjectRepository(ProductListing) private repo: Repository<ProductListing>,

        @Inject(forwardRef(() => ListTitleService))
        private readonly listTitleService: ListTitleService,

        @Inject(forwardRef(() => ProductsService))
        private readonly productService: ProductsService,

    ) { }

    create(dto: CreateProductListingDto): Promise<ProductListing> {
        const entity = this.repo.create(dto);
        return this.repo.save(entity);
    }

    findAll(): Promise<ProductListing[]> {
        return this.repo.find();
    }

    async findOne(id: string): Promise<ProductListing> {
        const item = await this.repo.findOne({ where: { productListingId: id } });
        if (!item) throw new NotFoundException(`ProductListing ${id} not found`);
        return item;
    }
    async findByListId(listId: string): Promise<any> {
        const listTitle = await this.listTitleService.findOne(listId);
        const items = await this.repo.find({
            where: { listTitleId: listId },
            order: { createdDate: 'DESC' },
        });

        if (!items.length) {
            throw new NotFoundException(`No listings for ${listId}`);
        }

        // fetch each product and merge
        const itemsWithProduct = await Promise.all(
            items.map(async (item) => {
                const product = await this.productService.findOne(item.productId);
                return { ...item, product };
            }),
        );

        return {
            list_title: listTitle.title,
            items: itemsWithProduct,
        };
    }

    async update(id: string, dto: UpdateProductListingDto): Promise<ProductListing> {
        await this.repo.update(id, dto);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        const res = await this.repo.delete(id);
        if (!res.affected) throw new NotFoundException(`ProductListing ${id} not found`);
    }
}