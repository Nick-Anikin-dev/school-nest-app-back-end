import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { BaseEntity } from "../../../common/types/base-entity";
import { ILesson } from "../../../core/lesson/lesson.interface";
import { Topic } from "../../topic/entities/topic.entity";
import { Group } from "../../group/entities/group.entity";
import { Student } from "../../student/entities/student.entity";
import { Teacher } from "../../teacher/entities/teacher.entity";

@Entity('lesson')
export class Lesson extends BaseEntity implements ILesson {
    @Column({
        type: 'varchar',
        nullable: true,
    })
    title: string;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    meeting_link: string;

    @Column({
        type: 'timestamptz',
        nullable: false,
    })
    from: Date;

    @Column({
        type: 'timestamptz',
        nullable: false,
    })
    to: Date;

    @Column({
        type: 'int',
        nullable: true,
    })
    topic_id: number | null;

    @ManyToOne(() => Topic)
    @JoinColumn({
        name: 'topic_id'
    })
    topic: Topic;

    @ManyToOne(() => Group, (group) => group.lessons)
    group: Group;

    @ManyToMany(() => Student, (student) => student.lessons)
    @JoinTable({
        name: 'student-lesson'
    })
    students: Student[];

    @ManyToMany(() => Teacher, (teacher) => teacher.lessons)
    @JoinTable({
        name: 'teacher-lesson'
    })
    teachers: Teacher[];
}
