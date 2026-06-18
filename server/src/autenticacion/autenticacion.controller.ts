import { Controller, Post, Body, UnauthorizedException, UploadedFile, UseInterceptors } from "@nestjs/common";
import { AutenticacionService } from "./autenticacion.service";
import { UsuariosService } from "src/usuarios/usuarios.service";
import { LoginAutenticacionDto } from "./dto/login-autenticacion.dto";
import * as bcrypt from 'bcrypt';
import { CreateAutenticacionDto } from "./dto/create-autenticacion.dto";
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { FileInterceptor } from '@nestjs/platform-express';
import { v2 as cloudinary } from 'cloudinary';
import { BadRequestException } from "@nestjs/common";

cloudinary.config({
  cloud_name: 'dbll45f5w',
  api_key: '167339771336668',
  api_secret: 'Euba_SQ64MkMasWYo6e9DeoZJdw',
});


@Controller("auth")
export class AutenticacionController {


  constructor(
    private authService: AutenticacionService,
    private usuarioService: UsuariosService
  ) { }

  @Post("login")
  async login(@Body() dto: LoginAutenticacionDto) {

    /* console.log("DTO RECIBIDO:", dto); */

    const usuario = await this.usuarioService.buscarPorCorreo(dto.correo);

    if (!usuario) {
      throw new UnauthorizedException("Usuario no encontrado");
    }

    if (!usuario.active) {
      throw new UnauthorizedException({ codigo: "USUARIO_INHABILITADO", mensaje: "El usuario se encuentra inhabilitado" });
    }

    /* console.log("USUARIO ENCONTRADO:", usuario); */

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
      perfil: usuario.perfil,
      imagen: usuario.imagen
    };

    return { token, usuario: usuarioRespuesta };
  }

  @Post('registro')
  //Subir imagen
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: new CloudinaryStorage({
        cloudinary,
        params: {
          public_id: (req, file) =>
            `IMG_${Date.now()}_archivos`,
        },
      }),
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createAutenticacionDto: CreateAutenticacionDto,
  ) {

    if (file) {
      createAutenticacionDto.imagen = file.path;
    }
    const usuario = await this.authService.registro(createAutenticacionDto);

    console.log("Usuario generado", usuario)

    const token = this.authService.generarToken(usuario);

    return { token, usuario };
  }

  @Post('registroComoAdmin')
  //Subir imagen
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: new CloudinaryStorage({
        cloudinary,
        params: {
          public_id: (req, file) =>
            `IMG_${Date.now()}_archivos`,
        },
      }),
    }),
  )
  async crear(
    @UploadedFile() file: Express.Multer.File,
    @Body() createAutenticacionDto: CreateAutenticacionDto,
  ) {

    if (file) {
      createAutenticacionDto.imagen = file.path;
    }
    const usuario = await this.authService.registro(createAutenticacionDto);

    console.log("Usuario generado", usuario)

    return { usuario };
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

    console.log("BODY RECIBIDO REFRESH:");
    console.log(body);

    try {
      const payload = this.authService.validarTokenSinFallo(body.token);
      const nuevoToken = this.authService.generarToken(payload);
      return {
        token: nuevoToken
      };

    } catch (error) {
      console.log("ERROR BACKEND REFRESH:");
      console.log(error);
      throw new UnauthorizedException();
    }
  }


}

// localStorage.clear()