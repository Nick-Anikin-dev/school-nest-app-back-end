import { ITask } from "../../../core/task/interfaces/task.interface";
import { TaskType } from "../../../core/task/enums/task-type.enum";
import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class Task implements ITask {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: TaskType,
        nullable: false,
    })
    type: TaskType;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}
