import { ConsoleLogger, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateAutenticacionDto } from "./dto/create-autenticacion.dto";
import * as bcrypt from 'bcrypt';

import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Usuario } from "../usuarios/entities/usuario.schema";


@Injectable()
export class AutenticacionService {


  constructor(
    private jwtService: JwtService,

    @InjectModel(Usuario.name)
    private usuarioModel: Model<Usuario>
  ) { }



  generarToken(usuario: any) {
    const datos = usuario.toObject();
    const payload = {
      _id: datos._id,
      correo: datos.correo,
      nombreDeUsuario: datos.nombreDeUsuario,
      perfil: datos.perfil
    };
    /* console.log("JWT PAYLOAD:", payload); */
    return this.jwtService.sign(payload);
  }

  validarToken(token: string) {
    const validacionToken = this.jwtService.verify(token)
    console.log("Validación de token:", validacionToken)
    return validacionToken;
  }

  async registro(createAutenticacionDto: CreateAutenticacionDto) {

    // Hasheo de contraseña
    createAutenticacionDto.contrasenia = await bcrypt.hash(createAutenticacionDto.contrasenia, 10); // Toma la contraseña (primer parametro) y la hashea (segundo parametro, 10 es el estandar de seguridad del hasheo). Lueso, se la asigna a el campo contrasenia

    const usuarioCreado = await this.usuarioModel.create(createAutenticacionDto); //Crea un nuevo documento en mongo (.create) de los datos que vienen en createAutenticacionDto. SOLO SE GUARDAN LOS DATOS QUE EL SHEMA (UsuarioRegistro -> UsuarioModel) PERMITE. createAutenticacionDto es comparado con UsuarioModel, si en este último tiene atributos que falten o esten de más, se agregaran estos últimos, por que el schema es lo que se sube a mongoose

    return usuarioCreado; //Esto después se puede eliminar, se usa solo para ver la respuesta del usuario creado por consola en registro.ts
  }



}