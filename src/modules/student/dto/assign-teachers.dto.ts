import { IsArray, IsInt, IsNotEmpty } from "class-validator";

export class AssignTeachersDto {
    @IsNotEmpty()
    @IsArray()
    @IsInt({each: true})
    teacher_ids: number[];
}
