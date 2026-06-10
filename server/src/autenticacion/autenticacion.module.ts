import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AutenticacionService } from './autenticacion.service';
import { AutenticacionController } from './autenticacion.controller';


@Module({

  imports: [

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
  ]

})
export class AutenticacionModule { }