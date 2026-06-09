import { IsString } from "class-validator";

export class ModificarComentarioDto {

    @IsString()
    mensaje:string;

}