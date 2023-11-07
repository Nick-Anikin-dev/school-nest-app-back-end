import { BaseEntity } from "../../../common/types/base-entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { ITopic } from "../../../core/topic/topic.interface";
import { Exercise } from "../../exercise/entities/exercise.entity";
import { Teacher } from "../../teacher/entities/teacher.entity";
import { Lesson } from "../../lesson/entities/lesson.entity";

@Entity('topic')
export class Topic extends BaseEntity implements ITopic {
    @Column({
        type: 'varchar',
        nullable: false,
    })
    title: string;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    description: string;

    @Column({
        type: 'int',
        nullable: false,
    })
    teacher_id: number;

    @ManyToMany(() => Exercise, (exercise) => exercise.topics)
    @JoinTable({
        name: 'exercise-topic'
    })
    exercises: Exercise[];

    @ManyToOne(() => Teacher, (teacher) => teacher.topics)
    @JoinColumn({
        name: 'teacher_id'
    })
    teacher: Teacher;

    @OneToMany(() => Lesson, (lesson) => lesson.topic)
    lessons: Lesson[];
}
