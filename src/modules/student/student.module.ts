import { forwardRef, Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Student } from "./entities/student.entity";
import { AuthModule } from "../auth/auth.module";
import { TeacherModule } from "../teacher/teacher.module";

@Module({
  imports: [ AuthModule, TypeOrmModule.forFeature([ Student ]),
    forwardRef(() => TeacherModule)
  ],
  controllers: [ StudentController ],
  providers: [ StudentService ],
  exports: [ StudentService ],
})
export class StudentModule {
}
