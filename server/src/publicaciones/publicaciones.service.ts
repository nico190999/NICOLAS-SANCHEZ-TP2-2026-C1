import { Injectable } from '@nestjs/common';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Publicacion } from './entities/publicacion.schema';
import { Model } from 'mongoose';

@Injectable()
export class PublicacionesService {

  constructor(
    @InjectModel(Publicacion.name) private PublicacionModel: Model<Publicacion> //Conecta PublicacionModel con la coleccion de mongo "publicacions"
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

    const filtro: any = { activo: true };

    if (usuarioId) {
      filtro.idUsuario = usuarioId;
    }

    const sort: Record<string, 1 | -1> =
      orden === 'likes'
        ? { cantidadLikes: -1 }
        : { fecha: -1 };

    const publicaciones = await this.PublicacionModel
      .find(filtro)
      .sort(sort)
      .skip(offset)
      .limit(limit);

    const total = await this.PublicacionModel.countDocuments(filtro);

    return {
      total,
      publicaciones
    };
  }



  async eliminar(id: string) {
    return await this.PublicacionModel.findByIdAndUpdate(
      id, { activo: false }, { returnDocument: 'after' } //Busca a la publicación que coincida el idPublicación, le modifica el campo "activo", pasandolo a false, y returnDocument: 'after' devuelve el nuevo elemento actualizado
    );
  }

  async darLike(
    idPublicacion: string,
    usuarioId: string
  ) {
    const publicacion =
      await this.PublicacionModel.findById(idPublicacion);

    if (!publicacion) {
      throw new Error("Publicación no encontrada");
    }
    // evitar likes duplicados

    if (publicacion.likes.includes(usuarioId)) {

      return {
        mensaje: "Ya diste like"
      };

    }



    // agregar like

    publicacion.likes.push(usuarioId);



    publicacion.cantidadLikes =
      publicacion.likes.length;



    return await publicacion.save();


  }


  async quitarLike(idPublicacion: string, usuarioId: string) {

    const publicacion = await this.PublicacionModel.findById(idPublicacion);

    if (!publicacion) {
      throw new Error(
        'Publicación no encontrada'
      );
    }

    publicacion.likes =
      publicacion.likes.filter(
        id => id !== usuarioId
      ); //Recorre el array y da uno nuevo quitando el id del usuario que ya le dio me gusta

    publicacion.cantidadLikes = publicacion.likes.length;

    await publicacion.save();

    return publicacion;

  }

  async obtenerPublicacion(id: string) {
    return await this.PublicacionModel.findById(id).exec();
  }
}
