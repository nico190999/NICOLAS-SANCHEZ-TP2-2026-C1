import { IsString } from "class-validator";

/* Valida y define los datos que entran, es decir los que le manda angular en this.http.post(ruta, LOS DATOS QUE LE MANDAN  ) */

export class CreateAutenticacionDto {

    @IsString()
    nombre: string

    @IsString()
    apellido: string

    @IsString()
    correo: string

    @IsString()
    nombreDeUsuario: string

    @IsString()
    contrasenia: string

    @IsString()
    repetirContrasenia: string

    @IsString()
    fechaNacimiento: string

    @IsString()
    descripcionBreve: string

}
