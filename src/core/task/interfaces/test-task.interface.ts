import { ITask } from "./task.interface";
import { TaskType } from "../enums/task-type.enum";
import { ITestOption } from "./test-task-option.interface";

export interface ITest extends ITask {
    type: TaskType.TEST,
    question: string;
    options: ITestOption[];
    correct_option_id: string;
}
