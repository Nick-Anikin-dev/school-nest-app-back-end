import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { School } from "./entities/school.entity";
import { UserModule } from "../user/user.module";
import { UserRoleModule } from "../user-role/user-role.module";

@Module({
  imports: [ AuthModule, TypeOrmModule.forFeature([ School ]), UserModule, UserRoleModule ],
  controllers: [ SchoolController ],
  providers: [ SchoolService ],
  exports: [SchoolService],
})
export class SchoolModule {
}
