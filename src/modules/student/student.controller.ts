import { Controller, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { RolesGuard } from "../../common/guards/roles.guard";

@Controller('student')
@UseGuards(RolesGuard)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
}
