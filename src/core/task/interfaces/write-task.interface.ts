import { ITask } from "./task.interface";
import { TaskType } from "../enums/task-type.enum";

export interface IWriteTask extends ITask {
    type: TaskType.WRITE,
    question: string;
    correct_answer: string;
}
