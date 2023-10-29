import { ITask } from "./task.interface";
import { TaskType } from "../enums/task-type.enum";
import { ITestOption } from "./test-task-option.interface";

export interface IMultipleTest extends ITask {
    type: TaskType.MULTIPLE_TEST,
    question: string;
    options: ITestOption[];
}
