import { IsString } from "class-validator";

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

    @IsString()
    perfil: string

    /* Imagenperfil llega por separado */

}
