import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Teacher } from "./entities/teacher.entity";
import { In, Repository } from "typeorm";
import { FindOptionsWhere } from "typeorm/find-options/FindOptionsWhere";
import { Student } from "../student/entities/student.entity";
import { RolesGuard } from "../../common/guards/roles.guard";
import { StudentService } from "../student/student.service";
import { AssignStudentsDto } from "./dto/assign-students.dto";

@Injectable()
@UseGuards(RolesGuard)
export class TeacherService {
  constructor(
      @InjectRepository(Teacher) private readonly teacherRepository: Repository<Teacher>,
      private readonly studentService: StudentService,
  ) {
  }

  async create(user_role_id: number) {
    const new_teacher = await this.teacherRepository.create({user_role_id})
    return await this.teacherRepository.save(new_teacher);
  }

  async findOneWhere(options: FindOptionsWhere<Student>) {
    return await this.teacherRepository.findOne({
      where: options,
    });
  }

  async findWhere(options: FindOptionsWhere<Student>) {
    return await this.teacherRepository.find({
      where: options,
    });
  }

  async assignStudents(id: number, school_id: number, dto: AssignStudentsDto) {
    const teacher = await this.teacherRepository.findOne({
      where: {
        id,
        school_id,
      },
      relations: [ 'students' ],
    })
    if (!teacher) {
      throw new NotFoundException();
    }
    const {student_ids} = dto;
    const students = await this.studentService.findWhere({
      id: In(student_ids)
    })
    return await this.teacherRepository.save({...teacher, students: [ ...teacher.students, ...students ]});
  }
}
