import { ITask } from "./task.interface";
import { TaskType } from "../enums/task-type.enum";

export interface IPairs extends ITask {
    type: TaskType.PAIRS;
}
