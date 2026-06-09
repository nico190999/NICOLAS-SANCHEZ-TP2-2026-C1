import { IsString } from "class-validator";

export class CrearComentarioDto {

    @IsString()
    idPublicacion: string;

    @IsString()
    idUsuario: string;

    @IsString()
    nombreDeUsuario: string;

    @IsString()
    mensaje: string;

    @IsString()
    fecha: string;
}