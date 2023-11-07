import { IStudent } from "../student/student.interface";
import { ITeacher } from "../techer/teacher.interface";
import { IAdmin } from "../admin/admin.interface";

export interface ISchool {
    id: number;
    name: string;
    preview: string;
    owner_role_id: number;
    students: IStudent[],
    teachers: ITeacher[],
    administrators: IAdmin[],
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
