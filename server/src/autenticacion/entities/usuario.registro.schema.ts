import { Schema } from "@nestjs/mongoose";
import { Prop } from "@nestjs/mongoose";
import { SchemaFactory } from "@nestjs/mongoose";

@Schema()
/* Se definen los atributos de la clase */
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
    repetirContrasenia: string

    @Prop()
    fechaNacimiento: string

    @Prop()
    descripcionBreve: string

    @Prop()
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
    "repetirContrasenia":,
    "fechaNacimiento":,
    "descripcionBreve":,
    "perfil":
}

*/