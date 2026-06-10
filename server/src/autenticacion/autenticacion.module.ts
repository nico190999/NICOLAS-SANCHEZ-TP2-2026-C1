import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AutenticacionService } from './autenticacion.service';
import { AutenticacionController } from './autenticacion.controller';
import { UsuariosModule } from 'src/usuarios/usuarios.module';


@Module({
  imports: [
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