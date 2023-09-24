import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Teacher } from "./entities/teacher.entity";
import { Repository } from "typeorm";

@Injectable()
export class TeacherService {
  constructor(@InjectRepository(Teacher) private readonly teacherRepository: Repository<Teacher>) {
  }

  async create(user_role_id: number) {
    const new_teacher = await this.teacherRepository.create({user_role_id})
    return await this.teacherRepository.save(new_teacher);
  }
}
