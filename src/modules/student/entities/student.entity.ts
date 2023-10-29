import { IStudent } from "../../../core/student/student.interface";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne } from "typeorm";
import { RoleTemplate } from "../../../core/role/role-template.entity";
import { UserRole } from "../../user-role/entities/user-role.entity";
import { Group } from "../../group/entities/group.entity";
import { School } from "../../school/entities/school.entity";

@Entity('student')
export class Student extends RoleTemplate implements IStudent {
    @OneToOne(() => UserRole, (userRole) => userRole.student, {
        nullable: false,
    })
    @JoinColumn({name: 'user_role_id'})
    user_role: UserRole;

    @Column({
        type: 'int',
        nullable: true,
    })
    school_id: number;

    @ManyToOne(() => School, (school) => school.students)
    @JoinColumn({
        name: 'school_id'
    })
    school: School;

    @ManyToMany(() => Group, (group) => group.students)
    @JoinTable({
        name: 'group-student'
    })
    groups: Group[];
}
