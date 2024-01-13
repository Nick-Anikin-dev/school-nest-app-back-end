import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class BaseFindQuery {
    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsNumber()
    page?: number = 1;

    @IsOptional()
    @IsNumber()
    per_page?: number = 15;

    @IsOptional()
    @IsEnum(['ASC', 'DESC'])
    order?: 'ASC' | 'DESC';

    @IsOptional()
    @IsString()
    order_by?: string;
}
