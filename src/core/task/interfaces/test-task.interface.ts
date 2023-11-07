import { ITask } from "./task.interface";
import { TaskType } from "../enums/task-type.enum";
import { ITestTaskOption } from "./test-task-option.interface";

export interface ITestTask extends ITask {
    type: TaskType.TEST,
    question: string;
    options: ITestTaskOption[];
    correct_option_id: string;
}
