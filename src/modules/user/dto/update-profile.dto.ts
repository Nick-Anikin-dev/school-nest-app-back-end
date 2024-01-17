import { IsArray, IsOptional, IsString, MaxLength } from "class-validator";
import { Transform } from "class-transformer";

export class UpdateProfileDto {
    @IsOptional()
    @IsString()
    @MaxLength(1000)
    self_presentation: string;

    @IsOptional()
    @IsArray()
    @IsString({
        each: true
    })
    @Transform(({value}) => JSON.parse(value))
    interests: string[];

    @IsOptional()
    @IsString()
    avatar_url?: string;
}
