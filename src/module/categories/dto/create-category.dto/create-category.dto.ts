import {
    IsString,
    IsOptional,
} from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    status?: string;

    @IsString()
    @IsOptional()
    created_by?: string;

    @IsString()
    @IsOptional()
    updated_by?: string;

    @IsString()
    @IsOptional()
    image?: string;
}
