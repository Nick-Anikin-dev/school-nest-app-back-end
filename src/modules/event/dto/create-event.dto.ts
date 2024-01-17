import { IsArray, IsDate, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from "class-validator";
import { Transform } from "class-transformer";
import { toDate } from "../../../common/utils/to-date";

export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    title: string;

    @IsString()
    @IsOptional()
    @MaxLength(1000)
    description: string;

    @IsInt()
    @IsNotEmpty()
    school_id: number;

    @IsDate()
    @IsNotEmpty()
    @Transform(({value}) => toDate(value))
    from: Date;

    @IsDate()
    @IsNotEmpty()
    @Transform(({value}) => toDate(value))
    to: Date;

    @IsOptional()
    @IsString()
   // @IsUrl()
    meeting_link: string;

    @IsArray()
    @IsOptional()
    @IsInt({each: true})
    guest_ids: number[];
}
