import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Lesson } from "./entities/lesson.entity";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [ AuthModule, TypeOrmModule.forFeature([ Lesson ]) ],
  controllers: [ LessonController ],
  providers: [ LessonService ]
})
export class LessonModule {}
