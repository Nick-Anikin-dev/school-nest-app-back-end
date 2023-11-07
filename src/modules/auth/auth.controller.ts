import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from "./dto/sign-up.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { User } from "../../common/decorators/user.decorator";
import { AuthUser } from "../../common/types/interfaces/auth-user.interface";
import { ChangePasswordDto } from "./dto/change-password.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async verify(@User() user: AuthUser){
    return await this.authService.verify(user);
  }

  @Post('/sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto);
  }

  @Post('/sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto);
  }


  @Patch('change-password')
  @UseGuards(JwtAuthGuard)
  async changePassword(@User() user: AuthUser, @Body() dto: ChangePasswordDto){
    return this.authService.changePassword(user, dto);
  }
}
