import { IsArray, IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { toDate } from "../../../common/utils/to-date";

export class CreateLessonDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsDate()
    @IsNotEmpty()
    @Transform(({value}) => toDate(value))
    from: Date;

    @IsDate()
    @IsNotEmpty()
    @Transform(({value}) => toDate(value))
    to: Date;

    @IsOptional()
    @IsArray()
    @IsInt({each: true})
    student_ids?: number[];

    @IsOptional()
    @IsInt()
    group_id?: number;

    @IsOptional()
    @IsArray()
    @IsInt({each: true})
    teacher_ids?: number[];
}
