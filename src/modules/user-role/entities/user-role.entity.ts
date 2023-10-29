import { IUserRole } from "../../../core/user-role/user-role.interface";
import { Role } from "../../../common/types/enums/role.enum";
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Student } from "../../student/entities/student.entity";
import { Teacher } from "../../teacher/entities/teacher.entity";
import { Admin } from "../../admin/entities/admin.entity";

@Entity('user-role')
export class UserRole implements IUserRole {
    @PrimaryGeneratedColumn()
    id: number;

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

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @OneToOne(() => User, (user) => user.role)
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
