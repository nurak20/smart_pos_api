import { PartialType } from '@nestjs/mapped-types';
import { CreateListTitleDto } from './create_list_title.dto';


export class UpdateListTitleDto extends PartialType(CreateListTitleDto) { }