import { Component } from '@angular/core';
import { AuthService } from '../../auth/services/auth-service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { PeticionesPublicacionesservice } from '../publicaciones/peticiones.publicaciones.service';
import { RouterLink } from '@angular/router';
import { FormatoFechaPipe } from '../../pipes/formato-fecha-pipe';
import { CapitalizarPipe } from '../../pipes/capitalizar-pipe';
import { HoverDirective } from '../../directivas/hover';
import { AgrandarLetraDirective } from '../../directivas/agrandar-letra';

@Component({
  selector: 'app-mi-perfil',
  imports: [ReactiveFormsModule, RouterLink, FormatoFechaPipe, CapitalizarPipe, HoverDirective, AgrandarLetraDirective],
  templateUrl: './mi-perfil.html',
  styleUrl: './mi-perfil.css',
})
export default class MiPerfil {

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private peticiones: PeticionesPublicacionesservice
  ) { }

  paginaActual = 1;
  limit = 3;
  orden = 'fecha';
  publicaciones: any[] = [];
  total = 0;
  usuario: any;
  archivoSeleccionado!: File;
  crearPublicacionFlag: boolean = false;

  ngOnInit() {
    this.usuario = this.authService.usuarioLogueado;
    this.cargarPublicaciones();
    console.log("Datos del usuario",this.usuario)
  }

  cargarPublicaciones() {
    const offset = (this.paginaActual - 1) * this.limit;

    this.peticiones.peticionCargarPublicaciones(offset, this.limit, this.orden, this.usuario?._id)
      .subscribe({
        next: (resp: any) => {
          console.log("RESPUESTA", resp);

          this.publicaciones = resp.publicaciones;
          this.total = resp.total;
          console.log(this.publicaciones)

          this.cdr.detectChanges();

        }
      });
  }


  formulario = new FormGroup({
    descripcion: new FormControl("", Validators.required)
  })

  crearNuevaPublicacion() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const formData = new FormData();

    formData.append('idUsuario', this.usuario?._id);
    formData.append('nombreDeUsuario', this.usuario?.nombreDeUsuario);
    formData.append('descripcion', this.formulario.value.descripcion ?? '');
    formData.append('fecha', new Date().toISOString());

    if (this.archivoSeleccionado) {
      formData.append('archivo', this.archivoSeleccionado);
    }

    this.peticiones.peticionPublicar(formData)
      .subscribe({
        next: (resp) => {
          console.log(resp);
        },
        error: (err) => {
          console.log(err.error);
        }
      });
  }

  hayPaginaSiguiente(): boolean {
    return this.paginaActual * this.limit < this.total;
  }

  siguientePagina() {
    this.paginaActual++;
    this.cargarPublicaciones();
  }

  paginaAnterior() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.cargarPublicaciones();
    }
  }

  habilitarFormularioDePublicacion() {
    this.crearPublicacionFlag = true;
  }

  deshabilitarFormularioDePublicacion() {
    this.crearPublicacionFlag = false;
  }

  seleccionarArchivo(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.archivoSeleccionado = input.files[0];
    }
  }


}
