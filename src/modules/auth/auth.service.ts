import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from "./dto/sign-in.dto";
import { SignUpDto } from "./dto/sign-up.dto";
import { User } from "../user/entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import * as bcrypt from 'bcryptjs';
import { AuthUser } from "../../common/types/interfaces/auth-user.interface";

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {
    }

    async signIn(dto: SignInDto) {
        const { password, ...user } = await this.validateUser(dto);
        const { token } = await this.generateToken(user);
        return {
            user, token,
        };
    }

    async signUp(dto: SignUpDto) {
        const candidate = await this.userService.findOneWhere({email: dto.email});
        if (candidate) {
            throw new HttpException('User with this is already exist', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(dto.password, 5);
        const user = await this.userService.create({ ...dto, password: hashPassword });
        const { token } = await this.generateToken(user);
        return {
            user,
            token,
        };
    }

    async verify(user: AuthUser) {
        return await this.userService.findOne(user.id)
    }

    private async validateUser(signInDto: SignInDto) {
        const user = await this.userService.findOneWhere({email: signInDto.email});
        if (!user) {
            throw new NotFoundException(`User with email: ${signInDto.email} does not exist`);
        }

        const isPasswordEquals = await bcrypt.compare(signInDto.password, user.password);

        if (isPasswordEquals) {
            return user;
        }
        throw new UnauthorizedException({message: 'Incorrect email or password'});
    }

    private async generateToken(user: Partial<User>) {
        const payload = {id: user.id, email: user.email};
        return {
            token: this.jwtService.sign(payload),
        };
    }
}
