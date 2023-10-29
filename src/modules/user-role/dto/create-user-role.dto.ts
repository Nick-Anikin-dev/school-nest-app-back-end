import { Role } from "../../../common/types/enums/role.enum";
import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";

export class CreateUserRoleDto {
    @IsNotEmpty()
    @IsNumber()
    user_id: number;

    @IsNotEmpty()
    @IsEnum(Role)
    type: Role;
}
