import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Patch, Query, UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { User } from "../../common/decorators/user.decorator";
import { AuthUser } from "../../common/types/interfaces/auth-user.interface";
import { FindUsersForCooperationQuery } from "./dto/find-users-for-cooperation.query";

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get('/profile')
  async getProfileData(@User() user: AuthUser) {
    return await this.userService.getProfileData(user);
  }

  @Patch('/profile')
  @UseInterceptors(FileInterceptor('avatar', {
    storage: diskStorage({
      destination: './public',
      filename(req: any, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
        if(file){
          callback(null, `user-avatar-${new Date().getTime()}-${file.originalname}`)
        }

      }
    }),
  }))
  async updateProfile(@User() user: AuthUser, @Body() dto: UpdateProfileDto, @UploadedFile(
      new ParseFilePipe({
        validators: [
          //new FileTypeValidator({fileType: 'image/*'}),
        ],
      }),
  )  avatar?: Express.Multer.File | undefined) {
    return await this.userService.updateProfile(user, dto, avatar);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }


  @Get('/cooperation')
  async findUsersForCooperation(@Query() query: FindUsersForCooperationQuery){
    return await this.userService.findUsersForCooperation(query);
  }

  @Get()
  async find() {
    return await this.userService.find();
  }
}
