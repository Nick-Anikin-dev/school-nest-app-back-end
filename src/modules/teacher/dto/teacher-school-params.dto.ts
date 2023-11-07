import { IsNotEmpty, IsNumberString } from "class-validator";

export class TeacherSchoolParamsDto {
    @IsNotEmpty()
    @IsNumberString()
    id: number;

    @IsNotEmpty()
    @IsNumberString()
    school_id: number;
}
