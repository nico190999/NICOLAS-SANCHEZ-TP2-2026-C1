import { Injectable } from '@nestjs/common';
import { Publicacion } from 'src/publicaciones/entities/publicacion.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comentario } from 'src/publicaciones/entities/comentario.schema';

@Injectable()
export class EstadisticasService {

    constructor(
        @InjectModel(Publicacion.name) private PublicacionModel: Model<Publicacion>, //Conecta PublicacionModel con la coleccion de mongo "publicacions"
        @InjectModel(Comentario.name) private comentarioModel: Model<Comentario>
    ) { }

    async publicacionesPorUsuario(desde: Date, hasta: Date) {

        hasta.setHours(23, 59, 59, 999);

        return this.PublicacionModel.aggregate([
            {
                $addFields: {
                    fechaConvertida: {
                        $dateFromString: {
                            dateString: "$fecha"
                        }
                    }
                }
            },
            {
                $match: {
                    fechaConvertida: {
                        $gte: desde,
                        $lte: hasta
                    }
                }
            },
            {
                $group: {
                    _id: "$idUsuario",
                    cantidad: {
                        $sum: 1
                    }
                }
            }
        ]);
    }

    async comentariosPorPublicacion(desde: Date, hasta: Date) {

        hasta.setHours(23, 59, 59, 999);

        return this.comentarioModel.aggregate([
            {
                $addFields: {
                    fechaConvertida: {
                        $dateFromString: {
                            dateString: "$fecha"
                        }
                    }
                }
            },
            {
                $match: {
                    fechaConvertida: {
                        $gte: desde,
                        $lte: hasta
                    }
                }
            },
            {
                $group: {
                    _id: "$idPublicacion",
                    cantidad: {
                        $sum: 1
                    }
                }
            }
        ]);
    }

    
}