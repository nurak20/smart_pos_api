import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';
import { Warehouse } from './entity/warehouse.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Warehouse])],
  providers: [WarehouseService],
  controllers: [WarehouseController],
})
export class WarehouseModule { }