import { Component } from '@angular/core';
import { Publicacion } from './publicacion/publicacion';
import { ChangeDetectorRef } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

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
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.cargarPublicaciones();
  }

  cargarPublicaciones() {

    const offset = (this.paginaActual - 1) * this.limit;

    this.http.get(`${environment.apiUrl}/publicaciones?offset=${offset}&limit=${this.limit}&orden=${this.orden}`)
      .subscribe({
        next: (resp: any) => {

          console.log("RESPUESTA", resp);

          this.publicaciones = resp.publicaciones;
          this.total = resp.total;

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