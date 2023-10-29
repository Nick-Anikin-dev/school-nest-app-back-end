import { School } from "../../school/entities/school.entity";
import { BaseEntity } from "../../../common/types/base-entity";
import { IGroup } from "../../../core/group/group.interface";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { Student } from "../../student/entities/student.entity";
import { Teacher } from "../../teacher/entities/teacher.entity";

@Entity('group')
export class Group extends BaseEntity implements IGroup {
    @Column({
        type: 'varchar',
        nullable: false,
    })
    name: string;

    @Column({
        type: 'int',
        nullable: false,
    })
    school_id: number;

    @ManyToOne(() => School, (school) => school.groups)
    @JoinColumn({
        name: 'school_id'
    })
    school: School;

    @ManyToMany(()=> Student, (student)=> student.groups)
    @JoinTable({
        name: 'group-student'
    })
    students: Student[];


    @ManyToMany(()=> Teacher, (teacher)=> teacher.groups)
    @JoinTable({
        name: 'group-teacher'
    })
    teachers: Teacher[];
}
