import { IsArray, IsInt, IsNotEmpty } from "class-validator";

export class AssignStudentsDto {
    @IsNotEmpty()
    @IsArray()
    @IsInt({each: true})
    student_ids: number[];
}
