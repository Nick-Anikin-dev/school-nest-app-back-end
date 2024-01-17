import { Role } from "../../../common/types/enums/role.enum";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class FindUsersForCooperationQuery {
    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsEnum(Role)
    role?: Role;
}
