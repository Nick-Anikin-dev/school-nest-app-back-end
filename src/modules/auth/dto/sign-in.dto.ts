import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignInDto {
    @ApiProperty({example: 'example@gmail.com', description: 'User email'})
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({example: 'example-password', description: 'User password'})
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
}
