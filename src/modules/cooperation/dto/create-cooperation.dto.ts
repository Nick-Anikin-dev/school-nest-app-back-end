import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCooperationDto {
    @IsOptional()
    @IsString()
    message: string;

    @IsNotEmpty()
    @IsInt()
    sender_id: number;

    @IsNotEmpty()
    @IsInt()
    recipient_id: number;
}
