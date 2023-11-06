import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(protected readonly jwtService: JwtService) {
    }

     canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization;
        const [ bearer, token ] = authHeader.split(' ');

        if (bearer !== "Bearer" || !token) {
            throw new UnauthorizedException();
        }

        try {
            const user = this.jwtService.verify(token);
            req.user = user;
            return true;
        } catch (e) {
            console.log(e)
            throw new UnauthorizedException();
        }
    }
}
