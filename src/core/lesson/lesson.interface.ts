import { IFile } from "../file/file";

export interface ILesson {
    id: number;
    title: string;
    files?: IFile[];
    from: Date;
    to: Date;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
