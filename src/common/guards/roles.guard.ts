import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from "./jwt-auth.guard";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class RolesGuard extends JwtAuthGuard implements CanActivate {
    constructor(
        protected readonly jwtService: JwtService,
        private reflector: Reflector,
    ) {
        super(jwtService);
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        await super.canActivate(context);
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        const request = context.switchToHttp().getRequest();
        const userRole = request.user?.role;

        if (!roles) {
            return true;
        }

        if (!userRole) {
            throw new ForbiddenException();
        }

        return roles.includes(userRole);
    }
}
