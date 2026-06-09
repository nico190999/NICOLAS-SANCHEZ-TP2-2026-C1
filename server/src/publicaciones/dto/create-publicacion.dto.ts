import { IsOptional } from "class-validator";
import { IsString } from "class-validator";

/* Valida y define los datos que entran, es decir los que le manda angular en this.http.post(ruta, LOS DATOS QUE LE MANDAN  ) */

export class CreatePublicacionDto {

    @IsString()
    idUsuario: string

    @IsString()
    nombreDeUsuario: string

    @IsOptional()
    @IsString()
    contenido?: string;

    @IsString()
    fecha: string


    @IsString()
    descripcion: string

    @IsOptional()
    @IsString()
    imagen?: string;

}
