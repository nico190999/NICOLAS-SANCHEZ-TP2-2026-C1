import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema({
    collection: "usuarioregistros"
})
export class Usuario {


    @Prop()
    nombre: string;


    @Prop()
    apellido: string;


    @Prop()
    correo: string;


    @Prop()
    nombreDeUsuario: string;


    @Prop()
    contrasenia: string;


    @Prop()
    fechaNacimiento: string;


    @Prop()
    descripcionBreve: string;


    @Prop()
    perfil: string;


}


export const UsuarioSchema =
    SchemaFactory.createForClass(Usuario);