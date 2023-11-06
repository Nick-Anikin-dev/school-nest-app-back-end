import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { School } from "./entities/school.entity";
import { UserModule } from "../user/user.module";

@Module({
  imports: [ AuthModule, TypeOrmModule.forFeature([ School ]), UserModule ],
  controllers: [ SchoolController ],
  providers: [ SchoolService ]
})
export class SchoolModule {
}
