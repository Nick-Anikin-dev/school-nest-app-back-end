import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../../../common/types/base-entity";
import { ILesson } from "../../../core/lesson/lesson.interface";
import { Topic } from "../../topic/entities/topic.entity";

@Entity('lesson')
export class Lesson extends BaseEntity implements ILesson {
    @Column({
        type: 'varchar',
        nullable: false,
    })
    title: string;

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
}
