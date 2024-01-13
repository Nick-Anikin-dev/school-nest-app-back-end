import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { RolesGuard } from "../../common/guards/roles.guard";
import { Roles } from "../../common/decorators/role.decorator";
import { Role } from "../../common/types/enums/role.enum";
import { User } from "../../common/decorators/user.decorator";
import { AuthUser } from "../../common/types/interfaces/auth-user.interface";
import { FindLessonsQueryDto } from "./dto/find-lessons-query.dto";

@Controller('lesson')
@UseGuards(RolesGuard)
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post()
  @Roles(Role.ADMIN, Role.TEACHER)
  async create(@Body() dto: CreateLessonDto, @User() user: AuthUser) {
    return await this.lessonService.create(dto, user);
  }

  @Get()
  @Roles(Role.ADMIN, Role.TEACHER, Role.STUDENT)
  async findAll(@User() user: AuthUser, @Query() query: FindLessonsQueryDto) {
    return await this.lessonService.findAll(user, query);
  }

  @Get(':id')
  @Roles(Role.TEACHER, Role.STUDENT)
  async findOne(@Param('id') id: string) {
    return await this.lessonService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.TEACHER)
  async update(@Param('id') id: string, @Body() dto: UpdateLessonDto) {
    return await this.lessonService.update(+id, dto);
  }

  @Delete(':id')
  @Roles(Role.TEACHER)
  async remove(@Param('id') id: string) {
    return await this.lessonService.remove(+id);
  }
}
