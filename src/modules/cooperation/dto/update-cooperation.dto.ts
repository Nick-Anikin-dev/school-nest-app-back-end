import { IsEnum, IsOptional, IsString } from "class-validator";
import { RequestForCooperationStatus } from "../../../core/cooperation/enums/request-for-cooperation-status.enum";

export class UpdateCooperationDto {
    @IsString()
    @IsOptional()
    message?: string;

    @IsEnum(RequestForCooperationStatus)
    @IsOptional()
    status?: RequestForCooperationStatus;
}
