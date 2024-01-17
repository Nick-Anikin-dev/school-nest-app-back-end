import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { Lesson } from "../modules/lesson/entities/lesson.entity";
import { User } from "../modules/user/entities/user.entity";
import { UserRole } from "../modules/user-role/entities/user-role.entity";
import { Student } from "../modules/student/entities/student.entity";
import { Admin } from "../modules/admin/entities/admin.entity";
import { Teacher } from "../modules/teacher/entities/teacher.entity";
import { School } from "../modules/school/entities/school.entity";
import { Topic } from "../modules/topic/entities/topic.entity";
import { RequestForCooperation } from "../modules/cooperation/entities/cooperation.entity";
import { Exercise } from "../modules/exercise/entities/exercise.entity";
import { Group } from "../modules/group/entities/group.entity";
import { Event } from "../modules/event/entities/event.entity";

enum Env {
    prod = "production",
    test = "testing",
    dev = "development",
}

function getDatabaseConfig(
    configService: ConfigService,
    entities
): PostgresConnectionOptions {
    const env = configService.get<Env>("NODE_ENV");

    switch (env) {
        case Env.prod:
            return {
                synchronize: true,
                type: configService.get("DB_TYPE"),
                host: configService.get("DB_HOST"),
                username: configService.get("DB_USERNAME"),
                password: configService.get("DB_PASSWORD"),
                database: configService.get("DB_DATABASE"),
                entities,
                migrations: [ __dirname + "/migrations/*.ts" ],
                migrationsTableName: "migrations",
                ssl: {
                    rejectUnauthorized: false,
                },
            };
        default:
            return {
                synchronize: true,
                type: configService.get("DB_TYPE"),
                port: configService.get<number>("DB_PORT"),
                host: configService.get("DB_HOST"),
                username: configService.get("DB_USERNAME"),
                password: configService.get("DB_PASSWORD"),
                database: configService.get("DB_DATABASE"),
                entities,
                migrations: [ __dirname + "/migrations/*.ts" ],
                migrationsTableName: "migrations"
            };
    }
}

export const DatabaseModule = TypeOrmModule.forRootAsync({
    imports: [ ConfigModule ],
    inject: [ ConfigService ],
    useFactory: (configService: ConfigService) =>
        getDatabaseConfig(configService, [
            User,
            UserRole,
            Admin,
            Teacher,
            Student,
            School,
            Lesson,
            Topic,
            RequestForCooperation,
            Exercise,
            Group,
            Event,
        ])
});
