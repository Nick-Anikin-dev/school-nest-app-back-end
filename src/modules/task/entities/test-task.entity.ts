import { Column, Entity, JoinTable, ManyToOne } from "typeorm";
import { ITestTask } from "../../../core/task/interfaces/test-task.interface";
import { ITestTaskOption } from "../../../core/task/interfaces/test-task-option.interface";
import { TaskType } from "../../../core/task/enums/task-type.enum";
import { Task } from "./task.entity";
import { TestOption } from "./test-option.entity";

@Entity('test-task')
export class TestTask extends Task implements ITestTask {
    type: TaskType.TEST;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    question: string;

    @ManyToOne(() => TestOption, {
        eager: true,
        cascade: true,
    })
    @JoinTable({
        name: 'test-task-options',
    })
    options: ITestTaskOption[];

    @Column({
        type: 'int',
        nullable: false,
    })
    correct_option_id: string;
}
