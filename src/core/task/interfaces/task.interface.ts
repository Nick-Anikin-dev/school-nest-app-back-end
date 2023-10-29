import { TaskType } from "../enums/task-type.enum";

export interface ITask {
    id: number;
    type: TaskType;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
