import { ITask } from "../../../core/task/interfaces/task.interface";
import { TaskType } from "../../../core/task/enums/task-type.enum";
import { Column } from "typeorm";
import { BaseEntity } from "../../../common/types/base-entity";

export class Task extends BaseEntity implements ITask {
    @Column({
        type: 'enum',
        enum: TaskType,
        nullable: false,
    })
    type: TaskType;
}
