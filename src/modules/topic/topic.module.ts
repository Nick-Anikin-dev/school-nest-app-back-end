import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Topic } from "./entities/topic.entity";
import { ExerciseModule } from "../exercise/exercise.module";
import { TeacherModule } from "../teacher/teacher.module";

@Module({
  imports: [AuthModule, TeacherModule, ExerciseModule, TypeOrmModule.forFeature([Topic])],
  controllers: [TopicController],
  providers: [TopicService]
})
export class TopicModule {}
