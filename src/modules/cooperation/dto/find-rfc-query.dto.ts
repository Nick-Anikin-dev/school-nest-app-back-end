import { RequestForCooperationStatus } from "../../../core/cooperation/enums/request-for-cooperation-status.enum";
import { RequestForCooperationType } from "../types/request-for-cooperation-type.enum";
import { IsDate, IsEnum, IsOptional } from "class-validator";
import { Transform } from "class-transformer";
import { paramToArray } from "../../../common/utils/param-to-array";
import { toDate } from "../../../common/utils/to-date";

export class FindRfcQueryDto {
    @IsOptional()
    @IsEnum(RequestForCooperationStatus, {each: true})
    @Transform(({value}) => paramToArray(value))
    status?: RequestForCooperationStatus[];

    @IsOptional()
    @IsEnum(RequestForCooperationType, {each: true})
    @Transform(({value}) => paramToArray(value))
    type?: RequestForCooperationType[];

    @IsOptional()
    @IsDate()
    @Transform(({value}) => toDate(value))
    created_from: Date;

    @IsOptional()
    @IsDate()
    @Transform(({value}) => toDate(value))
    created_to: Date;
}
