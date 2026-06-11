import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AutenticacionService } from './autenticacion.service';
import { AutenticacionController } from './autenticacion.controller';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuario, UsuarioSchema  } from 'src/usuarios/entities/usuario.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Usuario.name,
        schema: UsuarioSchema
      }
    ]),
    UsuariosModule,
    JwtModule.register({
      secret: 'CLAVE_SECRETA',
      signOptions: {
        expiresIn: '15m'
      }
    })
  ],
  controllers: [
    AutenticacionController
  ],
  providers: [
    AutenticacionService
  ],
  exports: [
    JwtModule
  ]
})
export class AutenticacionModule { }