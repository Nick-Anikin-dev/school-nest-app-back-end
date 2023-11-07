import { IsNotEmpty, IsString, Length } from "class-validator";

export class ChangePasswordDto {
    @IsNotEmpty()
    @IsString()
    @Length(6)
    old_password: string;

    @IsNotEmpty()
    @IsString()
    @Length(6)
    new_password: string;

    @IsNotEmpty()
    @IsString()
    @Length(6)
    repeat_new_password: string;
}
