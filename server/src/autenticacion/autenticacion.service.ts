import { Injectable } from '@nestjs/common';
import { CreateAutenticacionDto } from './dto/create-autenticacion.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UsuarioRegistro } from './entities/usuario.registro.schema';
import { Model } from 'mongoose';

@Injectable()
export class AutenticacionService {

  constructor(
    @InjectModel(UsuarioRegistro.name) private UsuarioModel : Model<UsuarioRegistro>,
  ) {}

  async create(createAutenticacionDto: CreateAutenticacionDto) {
    const usuarioCreado = await this.UsuarioModel.create(createAutenticacionDto);
    return usuarioCreado;
  }

  async findAll() {
    const usuarios = await this.UsuarioModel.find();
    return usuarios;
  }
}
