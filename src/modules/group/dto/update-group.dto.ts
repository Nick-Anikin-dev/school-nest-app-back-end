import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateGroupDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsOptional()
    @IsArray()
    @IsInt({each: true})
    student_ids?: number[];

    @IsOptional()
    @IsArray()
    @IsInt({each: true})
    teacher_ids?: number[];
}
