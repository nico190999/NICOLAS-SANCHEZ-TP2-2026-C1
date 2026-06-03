import { Component } from '@angular/core';
import { PublicacionesService } from '../../auth/services/publicaciones-service';
import { Publicacion } from './publicacion/publicacion';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-publicaciones',
  imports: [Publicacion],
  standalone: true,
  templateUrl: './publicaciones.html',
})
export default class PublicacionesComponent {

  paginaActual = 1;
  limit = 3;
  orden = 'fecha';

  publicaciones: any[] = [];
  total = 0;

  constructor(
    private publicacionesService: PublicacionesService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    console.log("Entré a publicaciones")
    this.cargarPublicaciones();
  }

  cargarPublicaciones() {

    const offset = (this.paginaActual - 1) * this.limit;

    this.publicacionesService.obtenerPublicaciones(offset,this.limit,this.orden)
      .subscribe({
        next: (resp: any) => {

          console.log("RESPUESTA", resp);
          console.log(resp);

          this.publicaciones = resp.publicaciones;
          this.total = resp.total;
          console.log(this.publicaciones)

          this.cdr.detectChanges();

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