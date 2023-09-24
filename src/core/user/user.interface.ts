import { Role } from "../../common/types/role.enum";

export interface IUser {
    id: number;
    role_id: number;
    first_name: string;
    last_name: string;
    password: string;
    email: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
