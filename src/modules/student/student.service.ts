import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Student } from "./entities/student.entity";
import { Repository } from "typeorm";

@Injectable()
export class StudentService {
  constructor(@InjectRepository(Student) private readonly studentRepository: Repository<Student>) {
  }

  async create(user_role_id: number) {
    const new_student = await this.studentRepository.create({user_role_id})
    return await this.studentRepository.save(new_student);
  }
}
