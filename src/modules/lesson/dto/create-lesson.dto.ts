import { IsDate, IsNotEmpty, IsString } from "class-validator";
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
}
