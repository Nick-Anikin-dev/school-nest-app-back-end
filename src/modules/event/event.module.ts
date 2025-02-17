import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Event } from "./entities/event.entity";
import { UserModule } from "../user/user.module";

@Module({
  imports: [ AuthModule, TypeOrmModule.forFeature([ Event ]), UserModule ],
  controllers: [ EventController ],
  providers: [ EventService ],
  exports: [ EventService ],
})
export class EventModule {}
