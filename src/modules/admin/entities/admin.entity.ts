import { RoleTemplate } from "../../../core/role/role-template.entity";
import { IAdmin } from "../../../core/admin/admin.interface";
import { Entity, JoinColumn, OneToOne } from "typeorm";
import { UserRole } from "../../user-role/entities/user-role.entity";

@Entity('admin')
export class Admin extends RoleTemplate implements IAdmin {
    @OneToOne(() => UserRole, (userRole) => userRole.admin, {
        nullable: false,
    })
    @JoinColumn({name: 'user_role_id'})
    user_role: UserRole;
}
