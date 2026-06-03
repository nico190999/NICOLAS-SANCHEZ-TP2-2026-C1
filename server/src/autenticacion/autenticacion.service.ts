import { Injectable } from '@nestjs/common';
import { CreateAutenticacionDto } from './dto/create-autenticacion.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UsuarioRegistro } from './entities/usuario.registro.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginAutenticacionDto } from './dto/login-autenticacion.dto';

@Injectable()
export class AutenticacionService {

  constructor(
    @InjectModel(UsuarioRegistro.name) private UsuarioModel: Model<UsuarioRegistro>,
  ) { }

  // --------------------------- SERVICIO DE REGISTRO -----------------------

  async registro(createAutenticacionDto: CreateAutenticacionDto) {

    // Hasheo de contraseña
    createAutenticacionDto.contrasenia = await bcrypt.hash(createAutenticacionDto.contrasenia, 10); // Toma la contraseña (primer parametro) y la hashea (segundo parametro, 10 es el estandar de seguridad del hasheo). Lueso, se la asigna a el campo contrasenia

    const usuarioCreado = await this.UsuarioModel.create(createAutenticacionDto); //Crea un nuevo documento en mongo (.create) de los datos que vienen en createAutenticacionDto. SOLO SE GUARDAN LOS DATOS QUE EL SHEMA (UsuarioRegistro -> UsuarioModel) PERMITE. createAutenticacionDto es comparado con UsuarioModel, si en este último tiene atributos que falten o esten de más, se agregaran estos últimos, por que el schema es lo que se sube a mongoose

    return usuarioCreado; //Esto después se puede eliminar, se usa solo para ver la respuesta del usuario creado por consola en registro.ts
  }

  // --------------------------- SERVICIO DE REGISTRO -----------------------






  // --------------------------- SERVICIO DE LOGIN -----------------------

  async login(loginDto: LoginAutenticacionDto) {

    const usuario =
      await this.UsuarioModel.findOne({
        correo: loginDto.correo
      });

    if (!usuario) {
      return {
        mensaje: 'Usuario no encontrado'
      };
    }

    const passwordCorrecta =
      await bcrypt.compare(
        loginDto.contrasenia,
        usuario.contrasenia
      );

    if (!passwordCorrecta) {

      return {
        mensaje: 'Contraseña incorrecta'
      };
    }

    return {
      usuario
    };
  }

  // --------------------------- SERVICIO DE LOGIN -----------------------
}







/* 

async findAll() {
    const usuarios = await this.UsuarioModel.find();
    return usuarios;
  }

*/
