import { RoleTemplate } from "../../../core/role/role-template.entity";
import { ITeacher } from "../../../core/techer/teacher.interface";
import { Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne } from "typeorm";
import { UserRole } from "../../user-role/entities/user-role.entity";
import { Group } from "../../group/entities/group.entity";
import { School } from "../../school/entities/school.entity";

@Entity('teacher')
export class Teacher extends RoleTemplate implements ITeacher {
    @OneToOne(() => UserRole, (userRole) => userRole.teacher, {
        nullable: false,
    })
    @JoinColumn({name: 'user_role_id'})
    user_role: UserRole;

    @ManyToOne(() => School, (school) => school.teachers)
    school: School;

    @ManyToMany(() => Group, (group) => group.teachers)
    @JoinTable({
        name: 'group-teacher'
    })
    groups: Group[];
}
