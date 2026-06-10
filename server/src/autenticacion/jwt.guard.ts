import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class JwtAuthGuard implements CanActivate {


    constructor(
        private jwtService: JwtService
    ) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedException(
                "No existe token"
            );
        }
        const token =
            authHeader.split(" ")[1];
        try {
            const usuario = this.jwtService.verify(token);
            request.user = usuario;
            return true
        } catch (error) {
            throw new UnauthorizedException(
                "Token inválido"
            );
        }
    }

}