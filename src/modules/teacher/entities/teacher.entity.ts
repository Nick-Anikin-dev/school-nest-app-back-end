import { RoleTemplate } from "../../../core/role/role-template.entity";
import { ITeacher } from "../../../core/techer/teacher.interface";
import { Entity, JoinColumn, OneToOne } from "typeorm";
import { UserRole } from "../../user-role/entities/user-role.entity";

@Entity('teacher')
export class Teacher extends RoleTemplate implements ITeacher {
    @OneToOne(() => UserRole, (userRole) => userRole.teacher, {
        nullable: false,
    })
    @JoinColumn({name: 'user_role_id'})
    user_role: UserRole;
}
