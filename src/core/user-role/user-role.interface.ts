import { Role } from "../../common/types/enums/role.enum";

export interface IUserRole {
    id: number;
    user_id: number;
    type: Role;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
