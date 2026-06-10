import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CrearComentarioDto } from "./dto/crear-comentario.dto";
import { Comentario } from "./entities/comentario.schema";
import { ModificarComentarioDto } from "./dto/modificar-comentario.dto";


@Injectable()
export class ComentariosService {

    constructor(
        @InjectModel(Comentario.name)
        private comentarioModel: Model<Comentario>
    ) { }

    async crearComentario(
        dto: CrearComentarioDto
    ) {

        return await this.comentarioModel.create({

            ...dto,

            modificado: false

        });

    }


    async obtenerComentarios(
        idPublicacion: string,
        offset: number,
        limit: number
    ) {

        return await this.comentarioModel
            .find({ idPublicacion })
            .sort({ fecha: -1 })
            .skip(offset)
            .limit(limit);

    }

    async modificarComentario(idComentario: string, dto: ModificarComentarioDto) {

        return await this.comentarioModel.findByIdAndUpdate(
            idComentario,
            {
                mensaje: dto.mensaje,
                modificado: true
            },
            {
                returnDocument: "after"
            }
        );

    }

}