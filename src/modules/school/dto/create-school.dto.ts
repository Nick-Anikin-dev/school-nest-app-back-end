import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateSchoolDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    name: string;

    @IsString()
    @IsOptional()
    @MaxLength(1000)
    preview?: string;
}
