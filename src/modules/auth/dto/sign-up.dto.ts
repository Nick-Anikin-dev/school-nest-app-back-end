import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { Role } from "../../../common/types/role.enum";

export class SignUpDto {
    @ApiProperty({example: 'user@mail.ru', description: 'Email'})
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiProperty({example: '12345', description: 'Password'})
    @IsNotEmpty()
    @IsString()
    @Length(6)
    readonly password: string;

    @ApiProperty({example: 'Nick', description: 'First name'})
    @IsNotEmpty()
    @IsString()
    readonly first_name: string;

    @ApiProperty({example: 'Anikin', description: 'Last name'})
    @IsNotEmpty()
    @IsString()
    readonly last_name: string;


    @ApiProperty({example: Role.STUDENT, description: 'User role'})
    @IsNotEmpty()
    @IsString()
    readonly role: Role;
}
