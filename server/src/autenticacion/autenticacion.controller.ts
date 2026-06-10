import { Controller, Post, Body, UnauthorizedException } from "@nestjs/common";
import { AutenticacionService } from "./autenticacion.service";
import { UsuariosService } from "src/usuarios/usuarios.service";
import { LoginAutenticacionDto } from "./dto/login-autenticacion.dto";
import * as bcrypt from 'bcrypt';


@Controller("auth")
export class AutenticacionController {


  constructor(
    private authService: AutenticacionService,
    private usuarioService: UsuariosService
  ) { }

  @Post("login")
  async login(@Body() dto: LoginAutenticacionDto) {

    const usuario = await this.usuarioService.buscarPorCorreo(dto.correo);
    if (!usuario) {
      throw new UnauthorizedException("Usuario no encontrado");
    }

    const contraseñaCorrecta = await bcrypt.compare(
      dto.contrasenia,
      usuario.contrasenia
    );
    if (!contraseñaCorrecta) {
      throw new UnauthorizedException("Contraseña incorrecta");
    }

    const token = this.authService.generarToken(usuario);

    const usuarioRespuesta = {
      _id: usuario._id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      correo: usuario.correo,
      nombreDeUsuario: usuario.nombreDeUsuario,
      descripcionBreve: usuario.descripcionBreve,
      fechaNacimiento: usuario.fechaNacimiento,
      perfil: usuario.perfil
    };

    return { token, usuario: usuarioRespuesta };
  }

  @Post("autorizar")
  async autorizar(@Body() body: any) {
    try {
      const datos = this.authService.validarToken(body.token);
      const usuario = await this.usuarioService.buscarPorId(datos._id);
      return {
        usuario
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  @Post("refrescar")
  refrescar(@Body() body: any) {
    try {
      const payload = this.authService.validarToken(body.token);
      const nuevoToken = this.authService.generarToken(payload);
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