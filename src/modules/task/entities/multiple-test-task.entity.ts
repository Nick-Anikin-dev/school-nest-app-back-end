import { Column, Entity, JoinTable, ManyToOne } from "typeorm";
import { ITestOption } from "../../../core/task/interfaces/test-task-option.interface";
import { TaskType } from "../../../core/task/enums/task-type.enum";
import { Task } from "./task.entity";
import { TestOption } from "./test-option.entity";
import { IMultipleTest } from "../../../core/task/interfaces/multiple-test-task.interface";

@Entity('multiple-test-task')
export class MultipleTestTask extends Task implements IMultipleTest {
    type: TaskType.MULTIPLE_TEST;

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
    options: ITestOption[];

    @ManyToOne(() => TestOption, {
        eager: true,
        cascade: true,
    })
    @JoinTable({
        name: 'correct-test-task-options',
    })
    correct_options: ITestOption[];
}
