import { Module } from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service';
import { PublicacionesController } from './publicaciones.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Publicacion, PublicacionSchema } from './entities/publicacion.schema';
import { ComentariosController } from './comentarios.controller';
import { ComentariosService } from './comentarios.service';
import { Comentario, ComentarioSchema } from './entities/comentario.schema';

@Module({
  imports: [
      MongooseModule.forFeature([
        {name: Publicacion.name, schema: PublicacionSchema},
      {name: Comentario.name, schema: ComentarioSchema}
      ])
    ],
  controllers: [PublicacionesController, ComentariosController],
  providers: [PublicacionesService, ComentariosService],
})
export class PublicacionesModule {}
