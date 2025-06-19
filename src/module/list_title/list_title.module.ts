// src/module/list_title/list_title.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ListTitleService } from './list_title.service';
import { ListTitleController } from './list_title.controller';

// Import ProductListingModule (circular) via forwardRef
import { ProductListingModule } from '../product_listing/product_listing.module';
import { ListTitle } from './list_title.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ListTitle]),
        forwardRef(() => ProductListingModule),
    ],
    controllers: [ListTitleController],
    providers: [ListTitleService],
    exports: [ListTitleService],    // so ProductListingModule can inject it
})
export class ListTitleModule { }
