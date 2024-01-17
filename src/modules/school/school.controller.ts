import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SchoolService } from './school.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { RolesGuard } from "../../common/guards/roles.guard";
import { Roles } from "../../common/decorators/role.decorator";
import { Role } from "../../common/types/enums/role.enum";
import { User } from "../../common/decorators/user.decorator";
import { AuthUser } from "../../common/types/interfaces/auth-user.interface";
import { IUser } from "../../core/user/user.interface";
import { JoinSchoolDto } from "./dto/join-school.dto";

@Controller('school')
    @UseGuards(RolesGuard)
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post()
  @Roles(Role.ADMIN)
  async create(@Body() dto: CreateSchoolDto, @User() user: AuthUser) {
    return await this.schoolService.create(dto, user);
  }

  @Get()
  @Roles(Role.ADMIN)
  async findAll(@User() user: IUser) {
    return await this.schoolService.findAll(user);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  async update(@Param('id') id: string, @Body() dto: UpdateSchoolDto) {
    return await this.schoolService.update(+id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async remove(@Param('id') id: string, @User() user: AuthUser) {
    return await this.schoolService.remove(+id, user);
  }

  @Post('/invitation/join')
  async joinSchool(@User() user: AuthUser, @Body() dto: JoinSchoolDto){
    return await this.schoolService.joinSchool(user, dto);
  }
}
