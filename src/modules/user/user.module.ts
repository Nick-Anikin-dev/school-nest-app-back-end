import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UserRoleModule } from "../user-role/user-role.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([
      User,
    ]),
    UserRoleModule ],
  controllers: [ UserController ],
  providers: [ UserService ],
  exports: [ UserService ]
})
export class UserModule {
}
