import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { PeticionesPublicacionesservice } from './peticiones.publicaciones.service';
import { RouterLink } from '@angular/router';
import { FormatoFechaPipe } from '../../pipes/formato-fecha-pipe';
import { ResaltarDirective } from '../../directivas/resaltar';
import { AgrandarLetraDirective } from '../../directivas/agrandar-letra';

@Component({
  selector: 'app-publicaciones',
  imports: [RouterLink, FormatoFechaPipe, ResaltarDirective, AgrandarLetraDirective],
  standalone: true,
  templateUrl: './publicaciones.html',
  styleUrl: './publicaciones.css',
})
export default class PublicacionesComponent {
  paginaActual = 1;
  limit = 3;
  orden = 'fecha';

  publicaciones: any[] = [];
  total = 0;

  constructor(
    private cdr: ChangeDetectorRef,
    private peticiones: PeticionesPublicacionesservice
  ) { }

  ngOnInit() {
    this.cargarPublicaciones();
  }

  ordenarPorFecha(){
    console.log("Entro a la función de ordenar por fecha")
    this.orden = 'fecha'
    this.paginaActual = 1
    this.cargarPublicaciones();
  }

  ordenarPorLikes(){
    console.log("Entro a la función de ordenar por likes")
    this.orden = 'likes'
    this.paginaActual = 1
    this.cargarPublicaciones();
  }

  cargarPublicaciones() {
    const offset = (this.paginaActual - 1) * this.limit;

    this.peticiones.peticionCargarPublicaciones(offset, this.limit, this.orden)
      .subscribe({
        next: (resp: any) => {
          this.publicaciones = resp.publicaciones;
          this.total = resp.total;
          this.cdr.detectChanges();
          console.log(this.publicaciones)
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

}