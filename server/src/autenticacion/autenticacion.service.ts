import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AutenticacionService {


  constructor(
    private jwtService: JwtService
  ) { }



  generarToken(usuario: any) {

    const payload = {
      uuid: usuario._id,
      correo: usuario.correo,
      nombreUsuario: usuario.nombreDeUsuario,
      rol: usuario.rol
    };

    return this.jwtService.sign(payload);
  }

  validarToken(token: string) {
    return this.jwtService.verify(token);
  }



}