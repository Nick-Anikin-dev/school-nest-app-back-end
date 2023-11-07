import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { RolesGuard } from "../../common/guards/roles.guard";
import { TeacherSchoolParamsDto } from "./dto/teacher-school-params.dto";
import { AssignStudentsDto } from "./dto/assign-students.dto";
import { Roles } from "../../common/decorators/role.decorator";
import { Role } from "../../common/types/enums/role.enum";

@Controller('teacher')
@UseGuards(RolesGuard)
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {
  }

  @Patch(':id/school/:school_id/assign/students')
  @Roles(Role.ADMIN)
  async assignStudents(@Param() params: TeacherSchoolParamsDto, @Body() dto: AssignStudentsDto) {
    return await this.teacherService.assignStudents(params.id, params.school_id, dto);
  }
}
