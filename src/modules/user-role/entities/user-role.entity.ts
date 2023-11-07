import { IUserRole } from "../../../core/user-role/user-role.interface";
import { Role } from "../../../common/types/enums/role.enum";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Student } from "../../student/entities/student.entity";
import { Teacher } from "../../teacher/entities/teacher.entity";
import { Admin } from "../../admin/entities/admin.entity";
import { BaseEntity } from "../../../common/types/base-entity";

@Entity('user-role')
export class UserRole extends BaseEntity implements IUserRole {
    @Column({
        type: 'int',
        nullable: false,
    })
    user_id: number;

    @Column({
        type: 'enum',
        enum: Role,
        nullable: false,
    })
    type: Role;


    @OneToOne(() => User, (user) => user.role, {cascade: true})
    @JoinColumn({name: 'user_id'})
    user: User;

    @OneToOne(() => Student, (student) => student.user_role, {
        nullable: true,
        eager: true,
        cascade: true,
    })
    student: Student;

    @OneToOne(() => Teacher, (teacher) => teacher.user_role, {
        nullable: true,
        eager: true,
        cascade: true,
    })
    teacher: Teacher;

    @OneToOne(() => Admin, (admin) => admin.user_role, {
        nullable: true,
        eager: true,
        cascade: true,
    })
    admin: Admin;
}
