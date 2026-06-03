import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { CreateAutenticacionDto } from './dto/create-autenticacion.dto';
import { LoginAutenticacionDto } from './dto/login-autenticacion.dto';
/* import { UpdateAutenticacionDto } from './dto/update-autenticacion.dto'; */

@Controller('auth')
export class AutenticacionController {
  constructor(private readonly autenticacionService: AutenticacionService) {}

  @Post('registro')
  create(@Body() createAutenticacionDto: CreateAutenticacionDto) {
    return this.autenticacionService.registro(createAutenticacionDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginAutenticacionDto){
    return this.autenticacionService.login(loginDto);
  }

}










/* 

@Get()
  findAll() {
    return this.autenticacionService.findAll();
  }


@Get(':id')
  findOne(@Param('id') id: string) {
    return this.autenticacionService.findOne(+id);
  } */

  /* @Patch(':id')
  update(@Param('id') id: string, @Body() updateAutenticacionDto: UpdateAutenticacionDto) {
    return this.autenticacionService.update(+id, updateAutenticacionDto);
  } */

  /* @Delete(':id')
  remove(@Param('id') id: string) {
    return this.autenticacionService.remove(+id);
  } */

