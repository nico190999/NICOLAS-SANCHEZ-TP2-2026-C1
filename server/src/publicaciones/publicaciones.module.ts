import { Module } from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service';
import { PublicacionesController } from './publicaciones.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Publicacion, PublicacionSchema } from './entities/publicacion.schema';
import { ComentariosController } from './comentarios.controller';
import { ComentariosService } from './comentarios.service';
import { Comentario, ComentarioSchema } from './entities/comentario.schema';
import { AutenticacionModule } from 'src/autenticacion/autenticacion.module';

@Module({
  imports: [
      MongooseModule.forFeature([
        {name: Publicacion.name, schema: PublicacionSchema},
      {name: Comentario.name, schema: ComentarioSchema}
      ]), AutenticacionModule
    ],
  controllers: [PublicacionesController, ComentariosController],
  providers: [PublicacionesService, ComentariosService],
})
export class PublicacionesModule {}
