import { Injectable } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { UserRole } from "./entities/user-role.entity";
import { Repository } from "typeorm";
import { Student } from "../student/entities/student.entity";
import { Teacher } from "../teacher/entities/teacher.entity";
import { Admin } from "../admin/entities/admin.entity";
import { Role } from "../../common/types/enums/role.enum";

@Injectable()
export class UserRoleService {
  constructor(
      @InjectRepository(UserRole) private readonly userRoleRepository: Repository<UserRole>,
      @InjectRepository(Student) private readonly studentRepository: Repository<Student>,
      @InjectRepository(Teacher) private readonly teacherRepository: Repository<Teacher>,
      @InjectRepository(Admin) private readonly adminRepository: Repository<Admin>,
  ) {
  }

  async create(dto: CreateUserRoleDto) {
    const new_user_role = await this.userRoleRepository.create(dto);
    const user_role = await this.userRoleRepository.save(new_user_role);
    switch (dto.type) {
      case Role.ADMIN:
      case Role.SUPER_ADMIN:
        const new_admin = await this.addUserRole(this.adminRepository, user_role.id)
        return {
          ...user_role,
          [user_role.type]: new_admin,
        }
      case Role.STUDENT:
        const new_student = await this.addUserRole(this.studentRepository, user_role.id)
        return {
          ...user_role,
          [user_role.type]: new_student,
        }
      case Role.TEACHER:
        const new_teacher = await this.addUserRole(this.teacherRepository, user_role.id)
        return {
          ...user_role,
          [user_role.type]: new_teacher,
        }
    }

  }

  async addUserRole(repository: Repository<Admin | Teacher | Student>, user_role_id: number) {
    const new_user_role = repository.create({user_role_id})
    return await repository.save(new_user_role);
  }

  async findOne(id: number) {
    return await this.userRoleRepository.findOne({where: {id}});
  }
}
