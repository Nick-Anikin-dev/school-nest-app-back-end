import { IsNotEmpty } from "class-validator";

export class GroupParamsDto {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    school_id: number;
}
