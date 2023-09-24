import { IStudent } from "../../../core/student/student.interface";
import { Entity, JoinColumn, OneToOne } from "typeorm";
import { RoleTemplate } from "../../../core/role/role-template.entity";
import { UserRole } from "../../user-role/entities/user-role.entity";

@Entity('student')
export class Student extends RoleTemplate implements IStudent {
    @OneToOne(() => UserRole, (userRole) => userRole.student, {
        nullable: false,
    })
    @JoinColumn({name: 'user_role_id'})
    user_role: UserRole;
}
