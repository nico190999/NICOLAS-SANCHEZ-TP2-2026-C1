import { Schema } from "@nestjs/mongoose";
import { Prop } from "@nestjs/mongoose";
import { SchemaFactory } from "@nestjs/mongoose";

@Schema()

/* Se definen los atributos de la clase
DEFINE LOS CAMPOS QUE SE VAN A GUARDAR EN MONGODB
*/

export class Publicacion {

    @Prop()
    idUsuario: string

    @Prop()
    nombreDeUsuario: string


    @Prop()
    contenido: string


    @Prop()
    fecha: string


    @Prop({ type: [String], default: [] })
    likes: string[];


    @Prop()
    descripcion: string


    @Prop({ type: [String], default: [] })
    comentarios: string[];

    @Prop({ default: 0 })
    cantidadLikes: number;

    @Prop({ default: true })
    activo: boolean; /* Se usa para la baja logica, es deci desactivarla */

}

export const PublicacionSchema = SchemaFactory.createForClass(Publicacion);
