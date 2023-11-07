import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { RolesGuard } from "../../common/guards/roles.guard";
import { Roles } from "../../common/decorators/role.decorator";
import { Role } from "../../common/types/enums/role.enum";

@Controller('lesson')
@UseGuards(RolesGuard)
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post()
  @Roles(Role.TEACHER)
  async create(@Body() dto: CreateLessonDto) {
    return await this.lessonService.create(dto);
  }

  @Get()
  @Roles(Role.TEACHER, Role.STUDENT)
  async findAll() {
    return await this.lessonService.findAll();
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
