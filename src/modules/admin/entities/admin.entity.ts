import { RoleTemplate } from "../../../core/role/role-template.entity";
import { IAdmin } from "../../../core/admin/admin.interface";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { UserRole } from "../../user-role/entities/user-role.entity";
import { School } from "../../school/entities/school.entity";

@Entity('admin')
export class Admin extends RoleTemplate implements IAdmin {
    @OneToOne(() => UserRole, (userRole) => userRole.admin, {
        nullable: false,
    })
    @JoinColumn({name: 'user_role_id'})
    user_role: UserRole;

    @Column({
        type: 'int',
        nullable: true,
    })
    school_id: number;

    @ManyToOne(() => School, (school) => school.administrators)
    @JoinColumn({
        name: 'school_id'
    })
    school: School;
}
