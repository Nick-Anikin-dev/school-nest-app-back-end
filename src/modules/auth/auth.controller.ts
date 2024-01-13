import { Body, Controller, Delete, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from "./dto/sign-up.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { User } from "../../common/decorators/user.decorator";
import { AuthUser } from "../../common/types/interfaces/auth-user.interface";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { Request } from "express";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async verify(@Req() req: Request){
    return await this.authService.verify(req);
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
