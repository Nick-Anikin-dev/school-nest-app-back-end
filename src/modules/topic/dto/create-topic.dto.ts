import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateTopicDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    @MaxLength(1000)
    description: string;

    @IsInt({each: true})
    @IsArray()
    @IsOptional()
    exercise_ids?: number[];
}
