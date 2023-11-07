import { Module } from '@nestjs/common';
import { CooperationService } from './cooperation.service';
import { CooperationController } from './cooperation.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { RequestForCooperation } from "./entities/cooperation.entity";
import { UserModule } from "../user/user.module";
import { AuthModule } from "../auth/auth.module";
import { SchoolModule } from "../school/school.module";

@Module({
  imports: [ AuthModule, TypeOrmModule.forFeature([ RequestForCooperation ]), UserModule, SchoolModule ],
  controllers: [ CooperationController ],
  providers: [ CooperationService ],
})
export class CooperationModule {}
