import { IsArray, IsOptional, IsString, MaxLength } from "class-validator";

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
    interests: string[];

    @IsOptional()
    @IsString()
    avatar_url?: string;
}
