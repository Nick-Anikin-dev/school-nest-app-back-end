import { Module } from '@nestjs/common';
import { DatabaseModule } from "./config/database.config";
import { SchoolModule } from './modules/school/school.module';
import { LessonModule } from './modules/lesson/lesson.module';
import { TeacherModule } from './modules/teacher/teacher.module';
import { TopicModule } from './modules/topic/topic.module';
import { AuthModule } from './modules/auth/auth.module';
import { StudentModule } from './modules/student/student.module';
import { FileModule } from './modules/file/file.module';
import { AdminModule } from './modules/admin/admin.module';
import { UserRoleModule } from './modules/user-role/user-role.module';
import { UserModule } from './modules/user/user.module';
import { CooperationModule } from './modules/cooperation/cooperation.module';
import { ConfigModule } from "@nestjs/config";
import { TaskModule } from './modules/task/task.module';
import { ExerciseModule } from './modules/exercise/exercise.module';
import { GroupModule } from './modules/group/group.module';
import { EventModule } from './modules/event/event.module';
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    MulterModule.register({
      dest: "./public"
    }),
    SchoolModule,
    LessonModule,
    TeacherModule,
    TopicModule,
    AuthModule,
    StudentModule,
    FileModule,
    AdminModule,
    UserRoleModule,
    UserModule,
    CooperationModule,
    TaskModule,
    ExerciseModule,
    ExerciseModule,
    GroupModule,
    EventModule
  ]
})
export class AppModule {
}
