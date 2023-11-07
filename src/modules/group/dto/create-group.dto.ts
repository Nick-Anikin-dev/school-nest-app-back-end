import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateGroupDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsInt()
    @IsNotEmpty()
    school_id: number;

    @IsOptional()
    @IsArray()
    @IsInt({each: true})
    student_ids?: number[];

    @IsOptional()
    @IsArray()
    @IsInt({each: true})
    teacher_ids?: number[];
}
