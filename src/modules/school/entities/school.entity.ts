import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../../../common/types/base-entity";
import { ISchool } from "../../../core/school/school.interface";
import { Student } from "../../student/entities/student.entity";
import { Teacher } from "../../teacher/entities/teacher.entity";
import { Group } from "../../group/entities/group.entity";
import { UserRole } from "../../user-role/entities/user-role.entity";
import { Admin } from "../../admin/entities/admin.entity";

@Entity('school')
export class School extends BaseEntity implements ISchool {
    @Column({
        type: 'varchar',
        nullable: false,
        unique: true,
    })
    name: string;

    @Column({
        type: 'int',
        nullable: false,
    })
    owner_role_id: number;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    preview: string;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    invitation_code: string;

    @ManyToOne(() => UserRole)
    @JoinColumn({name: 'owner_role_id'})
    owner: UserRole;

    @OneToMany(() => Student, (student) => student.school)
    students: Student[];

    @OneToMany(() => Teacher, (teacher) => teacher.school)
    teachers: Teacher[];

    @OneToMany(() => Admin, (admin) => admin.school)
    administrators: Admin[];

    @OneToMany(() => Group, (group) => group.school)
    groups: Group[];
}
