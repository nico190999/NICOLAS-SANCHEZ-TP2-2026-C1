import { Controller, Post, Body, UnauthorizedException, ConsoleLogger } from "@nestjs/common";
import { AutenticacionService } from "./autenticacion.service";


@Controller("auth")
export class AutenticacionController {


  constructor(
    private authService: AutenticacionService
  ) { }

  @Post("login")
  login(@Body() dto: any) {

    const usuario = {
      _id: "123",
      correo: dto.correo,
      nombreDeUsuario: "nicolas",
      rol: "usuario"
    };

    const token =
      this.authService.generarToken(usuario);

    return { token, usuario };
  }

  @Post("autorizar")
  autorizar(@Body() body: any) {

    try {

      console.log("TOKEN BACK:", body.token);

      const datos =
        this.authService.validarToken(body.token);

      console.log("PAYLOAD:", datos);

      return datos;

    } catch (error) {

      console.log("ERROR JWT:", error);

      throw new UnauthorizedException();

    }

  }

  @Post("refrescar")
  refrescar(@Body() body: any) {
    try {
      const payload =
        this.authService.validarToken(body.token);
      const nuevoToken =
        this.authService.generarToken(payload);
      return {
        token: nuevoToken
      };
    } catch (error) {
      console.log(error)
      throw new UnauthorizedException();
    }
  }


}

// localStorage.clear()