import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PublicacionesModule } from './publicaciones/publicaciones.module';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { UsuariosModule } from './usuarios/usuarios.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    PublicacionesModule,
    AutenticacionModule,
    UsuariosModule,
    MongooseModule.forRoot(process.env.MONGO_URI!), // Conexión de mongo!
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
