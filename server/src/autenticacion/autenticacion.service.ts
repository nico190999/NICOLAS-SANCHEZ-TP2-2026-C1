import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AutenticacionService {


  constructor(
    private jwtService: JwtService
  ) { }



  generarToken(usuario: any) {

    const datos = usuario.toObject();

    const payload = {
      _id: datos._id,
      correo: datos.correo,
      nombreDeUsuario: datos.nombreDeUsuario,
      perfil: datos.perfil
    };

    console.log("JWT PAYLOAD:", payload);

    return this.jwtService.sign(payload);
  }

  validarToken(token: string) {
    return this.jwtService.verify(token);
  }



}