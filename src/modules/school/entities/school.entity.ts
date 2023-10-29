import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { BaseEntity } from "../../../common/types/base-entity";
import { ISchool } from "../../../core/school/school.interface";
import { Student } from "../../student/entities/student.entity";
import { Teacher } from "../../teacher/entities/teacher.entity";
import { Group } from "../../group/entities/group.entity";

@Entity('school')
export class School extends BaseEntity implements ISchool {
    @Column({
        type: 'varchar',
        nullable: false,
    })
    name: string;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    preview: string;

    @OneToMany(() => Student, (student) => student.school)
    students: Student[];

    @OneToMany(() => Teacher, (teacher) => teacher.school)
    teachers: Teacher[];

    @OneToMany(() => Group, (group) => group.school)
    groups: Group[];
}
