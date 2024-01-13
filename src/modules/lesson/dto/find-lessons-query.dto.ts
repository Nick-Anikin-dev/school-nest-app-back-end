import { IsOptional } from "class-validator";

export class FindLessonsQueryDto {
    @IsOptional()
    from: Date;

    @IsOptional()
    to: Date;
}
