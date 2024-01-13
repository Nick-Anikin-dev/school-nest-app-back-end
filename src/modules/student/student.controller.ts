import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { StudentService } from './student.service';
import { FindStudentQueryDto } from "./dto/find-student-query.dto";
import { Roles } from "../../common/decorators/role.decorator";
import { Role } from "../../common/types/enums/role.enum";
import { AssignTeachersDto } from "./dto/assign-teachers.dto";

@Controller('student')
//@UseGuards(RolesGuard)
export class StudentController {
  constructor(private readonly studentService: StudentService) {
  }

  @Get('school/:school_id')
  async find(@Param('school_id') school_id: string, @Query() query: FindStudentQueryDto) {
    return await this.studentService.find(+school_id, query);
  }

  @Get('school/:school_id/list')
  async findStudentsList(@Param('school_id') school_id: string, @Query() query: FindStudentQueryDto) {
    return await this.studentService.findStudentsList(+school_id, query);
  }

  @Patch(':id/assign/teachers')
  @Roles(Role.ADMIN)
  async assignTeachers(@Param('id') id: string, @Body() dto: AssignTeachersDto) {
    return await this.studentService.assignTeachers(+id, dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.studentService.findOne(+id);
  }
}
