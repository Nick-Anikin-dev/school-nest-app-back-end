import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { BaseEntity } from "../../../common/types/base-entity";
import { Topic } from "../../topic/entities/topic.entity";
import { IExercise } from "../../../core/exerise/interfaces/test.interface";

@Entity('exercise')
export class Exercise extends BaseEntity implements IExercise {
    @Column({
        type: 'varchar',
        nullable: true,
    })
    title: string | null;

    @ManyToMany(() => Topic, (topic) => topic.exercises)
    @JoinTable({
        name: 'exercise-topic'
    })
    topics: Topic[];
}
