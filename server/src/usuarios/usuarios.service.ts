import { Injectable } from '@nestjs/common';
import { Usuario } from './entities/usuario.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsuariosService {

  constructor(
    @InjectModel(Usuario.name)
    private usuarioModel: Model<Usuario>
  ) { }

  async obtenerUsuarios() {
    return await this.usuarioModel.find();
  }

  async inhabilitarUsuario(id: string) {
    return await this.usuarioModel.findByIdAndUpdate(id,{active: false},{returnDocument: 'after'});
  }

  async habilitarUsuario(id: string) {
    return await this.usuarioModel.findByIdAndUpdate(id,{active: true},{returnDocument: 'after'});
  }

  async buscarPorCorreo(correo: string) {
    /* console.log("buscando correo", correo)
    console.log("COLECCION:", this.usuarioModel.collection.name); */

    const usuario = await this.usuarioModel.findOne({
      correo: correo
    });

    /* console.log("USUARIO ENCONTRADO:", usuario); */

    return usuario;
  }

  async buscarPorId(id: string) {
    return await this.usuarioModel.findById(id);
  }
}
