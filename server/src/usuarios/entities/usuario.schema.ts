import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema({
/* Se definen los atributos de la clase
DEFINE LOS CAMPOS QUE SE VAN A GUARDAR EN MONGODB
*/
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


    @Prop({default: "usuario"})
    perfil: string;

    @Prop()
    imagen: string;

    @Prop({default: true})
    active: boolean;


}


export const UsuarioSchema =
    SchemaFactory.createForClass(Usuario);