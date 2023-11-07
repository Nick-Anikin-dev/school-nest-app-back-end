import { RoleTemplate } from "../../../core/role/role-template.entity";
import { ITeacher } from "../../../core/techer/teacher.interface";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { UserRole } from "../../user-role/entities/user-role.entity";
import { Group } from "../../group/entities/group.entity";
import { School } from "../../school/entities/school.entity";
import { Lesson } from "../../lesson/entities/lesson.entity";
import { Student } from "../../student/entities/student.entity";
import { Topic } from "../../topic/entities/topic.entity";

@Entity('teacher')
export class Teacher extends RoleTemplate implements ITeacher {
    @OneToOne(() => UserRole, (userRole) => userRole.teacher, {
        nullable: false,
    })
    @JoinColumn({name: 'user_role_id'})
    user_role: UserRole;

    @Column({
        type: 'int',
        nullable: true,
    })
    school_id: number;

    @ManyToOne(() => School, (school) => school.teachers)
    @JoinColumn({
        name: 'school_id'
    })
    school: School;

    @ManyToMany(() => Group, (group) => group.teachers)
    @JoinTable({
        name: 'group-teacher'
    })
    groups: Group[];

    @ManyToMany(() => Lesson, (lesson) => lesson.teachers)
    @JoinTable({
        name: 'teacher-lesson'
    })
    lessons: Lesson[];

    @ManyToMany(() => Student, (student) => student.teachers)
    @JoinTable({
        name: 'teacher-student'
    })
    students: Student[];

    @OneToMany(() => Topic, (topic) => topic.teacher)
    topics: Topic[];
}
