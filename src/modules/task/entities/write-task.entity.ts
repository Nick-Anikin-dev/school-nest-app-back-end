import { Column, Entity } from "typeorm";
import { Task } from "./task.entity";
import { TaskType } from "../../../core/task/enums/task-type.enum";
import { IWriteTask } from "../../../core/task/interfaces/write-task.interface";

@Entity('write-task')
export class WriteTask extends Task implements IWriteTask {
    type: TaskType.WRITE;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    question: string;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    correct_answer: string;
}
