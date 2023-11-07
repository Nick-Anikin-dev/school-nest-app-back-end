import { Order } from "../../../common/types";
import { IsOptional, IsString } from "class-validator";

export class FindGroupQueryDto {
    @IsString()
    @IsOptional()
    search?: string;

    @IsString()
    @IsOptional()
    order?: Order;
}
