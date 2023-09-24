import { Module } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRole } from "./entities/user-role.entity";
import { Student } from "../student/entities/student.entity";
import { Teacher } from "../teacher/entities/teacher.entity";
import { Admin } from "../admin/entities/admin.entity";

@Module({
  imports: [ TypeOrmModule.forFeature([ UserRole, Student, Teacher, Admin ]) ],
  providers: [ UserRoleService ],
  exports: [ UserRoleService ],
})
export class UserRoleModule {
}
