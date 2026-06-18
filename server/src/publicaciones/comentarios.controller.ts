import { Body, Controller, Post, Put } from "@nestjs/common";
import { Get, Param } from "@nestjs/common";
import { ComentariosService } from "./comentarios.service";
import { CrearComentarioDto } from "./dto/crear-comentario.dto";
import { ModificarComentarioDto } from "./dto/modificar-comentario.dto";
import { Query } from "@nestjs/common";

@Controller("comentarios")
export class ComentariosController {

    constructor(
        private readonly comentariosService: ComentariosService
    ) { }

    @Get(':idPublicacion')
    obtenerComentarios(
        @Param('idPublicacion') idPublicacion: string,
        @Query('offset') offset: string,
        @Query('limit') limit: string
    ) {
        return this.comentariosService.obtenerComentarios(idPublicacion, Number(offset), Number(limit));
    }

    @Post()
    crearComentario(@Body() dto: CrearComentarioDto) {
        return this.comentariosService.crearComentario(dto);
    }

    @Put(':idComentario')
    modificarComentario(
        @Param('idComentario') idComentario: string,
        @Body() dtoMod: ModificarComentarioDto
    ) {
        return this.comentariosService.modificarComentario(idComentario, dtoMod);
    }


}