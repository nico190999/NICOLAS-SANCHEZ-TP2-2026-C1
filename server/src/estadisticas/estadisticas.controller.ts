import { Controller } from '@nestjs/common';
import { EstadisticasService } from './estadisticas.service';
import { Get, Query } from '@nestjs/common';

@Controller('estadisticas')
export class EstadisticasController {
  constructor(private readonly estadisticasService: EstadisticasService) {}

  @Get("publicaciones")
    obtenerPublicaciones(
      @Query("desde") desde: string,
      @Query("hasta") hasta: string
    ) {
      return this.estadisticasService.publicacionesPorUsuario(
        new Date(desde),
        new Date(hasta)
      );
    }

    @Get("comentarios")
    obtenerComentariosEstadistica(
        @Query("desde") desde: string,
        @Query("hasta") hasta: string
    ) {

        return this.estadisticasService.comentariosPorPublicacion(
            new Date(desde),
            new Date(hasta)
        );

    }
}
