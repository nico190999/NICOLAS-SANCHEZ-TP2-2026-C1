import { Module } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { AutenticacionController } from './autenticacion.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioRegistro, UsuarioSchema } from './entities/usuario.registro.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: UsuarioRegistro.name, schema: UsuarioSchema}
    ])
  ],
  controllers: [AutenticacionController],
  providers: [AutenticacionService],
})
export class AutenticacionModule {}
