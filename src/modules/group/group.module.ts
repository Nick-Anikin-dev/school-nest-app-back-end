import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Group } from "./entities/group.entity";
import { AuthModule } from "../auth/auth.module";
import { TeacherModule } from "../teacher/teacher.module";
import { StudentModule } from "../student/student.module";
import { SchoolModule } from "../school/school.module";

@Module({
  imports: [ AuthModule, SchoolModule, TeacherModule, StudentModule, TypeOrmModule.forFeature([ Group ]) ],
  controllers: [ GroupController ],
  providers: [ GroupService ],
  exports: [ GroupService ]
})
export class GroupModule {
}
