import { IsBoolean, IsNotEmpty } from "class-validator";

export class RespondCooperationDto {
    @IsNotEmpty()
    @IsBoolean()
    approve: boolean;
}
