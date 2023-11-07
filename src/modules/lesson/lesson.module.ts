import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Lesson } from "./entities/lesson.entity";
import { AuthModule } from "../auth/auth.module";
import { TeacherModule } from "../teacher/teacher.module";
import { StudentModule } from "../student/student.module";
import { GroupModule } from "../group/group.module";

@Module({
  imports: [ AuthModule, TeacherModule, StudentModule, GroupModule, TypeOrmModule.forFeature([ Lesson ]) ],
  controllers: [ LessonController ],
  providers: [ LessonService ]
})
export class LessonModule {}
