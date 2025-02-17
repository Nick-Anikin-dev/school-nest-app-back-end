import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [ UserModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || "SECRET",
      signOptions: {
        expiresIn: "24h"
      }
    })
  ],
  controllers: [ AuthController ],
  providers: [ AuthService ],
  exports: [ JwtModule ]
})
export class AuthModule {
}
