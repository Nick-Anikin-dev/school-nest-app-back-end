import { IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateSchoolDto {
    @IsString()
    @IsOptional()
    @MaxLength(200)
    name: string;

    @IsString()
    @IsOptional()
    @MaxLength(1000)
    preview?: string;
}
