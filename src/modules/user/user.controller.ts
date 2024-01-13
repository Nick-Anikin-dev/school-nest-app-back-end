import { Controller, Get, Param, Patch, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { User } from "../../common/decorators/user.decorator";
import { AuthUser } from "../../common/types/interfaces/auth-user.interface";

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }


  @Get()
  async find() {
    return await this.userService.find();
  }

  @Get('/profile')
  async getProfileData(@User() user: AuthUser){
    return await this.userService.getProfileData(user);
  }

  @Patch('/profile')
  @UseInterceptors(FileInterceptor('avatar', {
    storage: diskStorage({
      destination: './public',
      filename(req: any, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
        callback(null, `user-avatar-${file.originalname}-${new Date().getTime()}`)
      }
    }),
  }))
  async updateProfile(@User() user: AuthUser, dto: UpdateProfileDto, avatar: Express.Multer.File | null) {
    return await this.userService.updateProfile(user, dto, avatar);
  }
}
