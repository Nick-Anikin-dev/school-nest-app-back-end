import { Body, Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { RolesGuard } from "../../common/guards/roles.guard";
import { AssignStudentsDto } from "./dto/assign-students.dto";
import { Roles } from "../../common/decorators/role.decorator";
import { Role } from "../../common/types/enums/role.enum";
import { BaseFindQuery } from "../../common/types/base-find-query";
import { FindStudentQueryDto } from "../student/dto/find-student-query.dto";

@Controller('teacher')
//@UseGuards(RolesGuard)
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {
  }

  @Get('school/:school_id')
  async find(@Param('school_id') school_id: string, @Query() query: BaseFindQuery) {
    return await this.teacherService.find(+school_id, query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string){
    return await this.teacherService.findOne(+id);
  }

  @Patch(':id/assign/students')
  @Roles(Role.ADMIN)
  async assignStudents(@Param('id') id: string, @Body() dto: AssignStudentsDto) {
    return await this.teacherService.assignStudents(+id, dto);
  }

  @Get('school/:school_id/list')
  async findTeachersList(@Param('school_id') school_id: string, @Query() query: FindStudentQueryDto){
    return await this.teacherService.findTeachersList(+school_id, query);
  }
}
