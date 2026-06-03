import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { Query } from '@nestjs/common';
import { ListarPublicacionesDto } from './dto/listar-publicaciones.dto';

@Controller('publicaciones')
export class PublicacionesController {
  constructor(private readonly publicacionesService: PublicacionesService) { }

  @Post('publicar')
  create(@Body() createPublicacionDto: CreatePublicacionDto) {
    return this.publicacionesService.publicar(createPublicacionDto);
  }

  @Get()
  listar(
    @Query() dto: ListarPublicacionesDto
  ) {
    return this.publicacionesService.listar(
      Number(dto.offset ?? 0),
      Number(dto.limit ?? 10),
      dto.orden ?? 'fecha',
      dto.usuarioId
    );
  }

}


/* 

@Get()
  findAll() {
    return this.publicacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicacionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePublicacioneDto: UpdatePublicacioneDto) {
    return this.publicacionesService.update(+id, updatePublicacioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicacionesService.remove(+id);
  }


*/