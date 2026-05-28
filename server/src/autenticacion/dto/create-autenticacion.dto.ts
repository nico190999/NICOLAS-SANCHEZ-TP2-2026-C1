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
    descripcionBreve: string

}
