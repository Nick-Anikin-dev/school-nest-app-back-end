import { forwardRef, Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Teacher } from "./entities/teacher.entity";
import { AuthModule } from "../auth/auth.module";
import { StudentModule } from "../student/student.module";

@Module({
  imports: [ AuthModule, TypeOrmModule.forFeature([ Teacher ]), forwardRef(()=> StudentModule) ],
  controllers: [ TeacherController ],
  providers: [ TeacherService ],
  exports: [ TeacherService ],
})
export class TeacherModule {
}
