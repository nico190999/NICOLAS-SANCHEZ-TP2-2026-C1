import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { Query } from '@nestjs/common';
import { ListarPublicacionesDto } from './dto/listar-publicaciones.dto';

import { FileInterceptor } from '@nestjs/platform-express';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: 'dbll45f5w',
  api_key: '167339771336668',
  api_secret: 'Euba_SQ64MkMasWYo6e9DeoZJdw',
});



//El controlador unicamente lo que hace es recibir las peticiones de angular (meidante las rutas /publicaciones/etc), obtiene los parametros y llama a los servicios que se encargan de realizar la función 
@Controller('publicaciones')
export class PublicacionesController {
  constructor(private readonly publicacionesService: PublicacionesService) { }

  //----------------------------------- SUBIDA DE IMAGENES -------------------------------------

  logger = new Logger('PETICIONES', { timestamp: true });

  @Post('subirImagen')
  @UseInterceptors(
    FileInterceptor('archivo', {
      storage: new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
          public_id: (req, file) => `IMG_${Date.now()}_archivos`,
        },
      }),
    }),
  )
  async subidaDeArchivos(@UploadedFile() file: Express.Multer.File) {
    return {
      url: file.path
    };
  }

  //----------------------------------- SUBIDA DE IMAGENES -------------------------------------




  @Post('publicar')
  @UseInterceptors(
    FileInterceptor('archivo', {
      storage: new CloudinaryStorage({
        cloudinary,
        params: {
          public_id: (req, file) =>
            `IMG_${Date.now()}_archivos`,
        },
      }),
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPublicacionDto: CreatePublicacionDto,
  ) {

    if (file) {
      createPublicacionDto.contenido = file.path;
    }

    return this.publicacionesService.publicar(
      createPublicacionDto,
    );
  }

  @Get()
  listar(@Query() dto: ListarPublicacionesDto) {
    return this.publicacionesService.listar(
      Number(dto.offset ?? 0),
      Number(dto.limit ?? 10),
      dto.orden ?? 'fecha',
      dto.usuarioId
    );
  }

  @Delete(':id') //BAJA LOGICA, HACE DESAPARECER LA PUBLICACIÓN, NO LA ELIMINA
  //Nest interpreta el :id como el id de la publicación enviada en Angular
  eliminarPorId(@Param('id') id: string) { //Param se encarga de tomar el valor que que venga de la URL que dice :id y lo guarda en una nueva varibale denominada id
    return this.publicacionesService.eliminar(id);
  }




  @Post(':id/like')
  darLike(
    @Param('id') idPublicacion: string,
    @Body('usuarioId') usuarioId: string //Body toma lo que se pasa luego de la ruta en la petición 
  ) {
    return this.publicacionesService.darLike(idPublicacion, usuarioId);
  }


  @Delete(':idPublicacion/like/:usuarioId')
  quitarLike(
    @Param('idPublicacion') idPublicacion: string,
    @Param('usuarioId') usuarioId: string
  ) {
    return this.publicacionesService.quitarLike(idPublicacion, usuarioId);
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