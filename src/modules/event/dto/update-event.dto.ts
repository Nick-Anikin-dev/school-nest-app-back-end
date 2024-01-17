import { IsArray, IsDate, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from "class-validator";

export class UpdateEventDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    title: string;

    @IsString()
    @IsOptional()
    @MaxLength(1000)
    description: string;

    @IsDate()
    @IsNotEmpty()
    from: Date;

    @IsDate()
    @IsNotEmpty()
    to: Date;

    @IsString()
    @IsOptional()
    @IsUrl()
    meeting_link: string;

    @IsArray()
    @IsOptional()
    @IsInt({each: true})
    guest_ids: number[];
}
