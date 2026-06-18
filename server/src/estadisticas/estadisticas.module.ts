import { EstadisticasController } from './estadisticas.controller';
import { EstadisticasService } from './estadisticas.service';

import { Publicacion, PublicacionSchema } from 'src/publicaciones/entities/publicacion.schema';
import { Comentario, ComentarioSchema } from 'src/publicaciones/entities/comentario.schema';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Publicacion.name,
        schema: PublicacionSchema
      },
      {
        name: Comentario.name,
        schema: ComentarioSchema
      }
    ])
  ],

  controllers: [
    EstadisticasController
  ],

  providers: [
    EstadisticasService
  ]

})
export class EstadisticasModule { }