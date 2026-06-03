import { Injectable } from '@nestjs/common';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Publicacion } from './entities/publicacion.schema';
import { Model } from 'mongoose';

@Injectable()
export class PublicacionesService {

  constructor(
    @InjectModel(Publicacion.name) private PublicacionModel: Model<Publicacion>
  ) { }


  async publicar(createPublicacionDto: CreatePublicacionDto) {

    const publicacionCreada = await this.PublicacionModel.create(createPublicacionDto);

    return publicacionCreada;

  }


  async listar(
    offset = 0,
    limit = 10,
    orden = 'fecha',
    usuarioId?: string
  ) {

    const filtro: any = {
      activo: true
    };

    if (usuarioId) {
      filtro.usuarioId = usuarioId;
    }

    const sort: Record<string, 1 | -1> =
      orden === 'likes'
        ? { cantidadLikes: -1 }
        : { fechaCreacion: -1 };

    const publicaciones = await this.PublicacionModel
      .find()
      .sort({ fecha: -1 })
      .skip(offset)
      .limit(limit);

    const total = await this.PublicacionModel.countDocuments();

    return {
      total,
      publicaciones
    };
  }

}
