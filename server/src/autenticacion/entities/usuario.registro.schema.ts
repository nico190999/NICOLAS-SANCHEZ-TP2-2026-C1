import { Schema } from "@nestjs/mongoose";
import { Prop } from "@nestjs/mongoose";
import { SchemaFactory } from "@nestjs/mongoose";

@Schema()
/* Se definen los atributos de la clase
DEFINE LOS CAMPOS QUE SE VAN A GUARDAR EN MONGODB
*/
export class UsuarioRegistro {

    @Prop()
    nombre: string

    @Prop()
    apellido: string

    @Prop()
    correo: string

    @Prop()
    nombreDeUsuario: string

    @Prop()
    contrasenia: string

    @Prop()
    fechaNacimiento: string

    @Prop()
    descripcionBreve: string

    @Prop({default: "usuario"}) /* Deja asignado un valor por defecto */
    perfil: string

}

export const UsuarioSchema = SchemaFactory.createForClass(UsuarioRegistro);


/* 

{
    "nombre":,
    "apellido":,
    "correo":,
    "nombreDeUsuario":,
    "contrasenia":,
    "fechaNacimiento":,
    "descripcionBreve":,
    "perfil":
}

*/