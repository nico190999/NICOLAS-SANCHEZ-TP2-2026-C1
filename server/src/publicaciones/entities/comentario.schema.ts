import { Schema, Prop } from "@nestjs/mongoose";
import { SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Comentario {

    @Prop()
    idPublicacion: string;

    @Prop()
    idUsuario: string;

    @Prop()
    nombreDeUsuario: string;

    @Prop()
    mensaje: string;

    @Prop()
    fecha: string;

    @Prop({
        default: false
    })
    modificado: boolean;
}

export const ComentarioSchema = SchemaFactory.createForClass(Comentario);