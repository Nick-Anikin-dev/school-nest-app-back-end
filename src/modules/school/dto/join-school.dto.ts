import { IsHash, IsNotEmpty, IsString } from "class-validator";

export class JoinSchoolDto {
    @IsNotEmpty()
    @IsString()
    invitation_code: string;
}
