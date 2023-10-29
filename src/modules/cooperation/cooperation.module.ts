import { Module } from '@nestjs/common';
import { CooperationService } from './cooperation.service';
import { CooperationController } from './cooperation.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { RequestForCooperation } from "./entities/cooperation.entity";
import { UserModule } from "../user/user.module";

@Module({
  imports: [ TypeOrmModule.forFeature([ RequestForCooperation ]), UserModule ],
  controllers: [ CooperationController ],
  providers: [ CooperationService ],
})
export class CooperationModule {}
