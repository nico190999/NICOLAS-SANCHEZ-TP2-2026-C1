import { Component } from '@angular/core';
import { Publicacion } from './publicacion/publicacion';
import { ChangeDetectorRef } from '@angular/core';
import { PeticionesPublicacionesservice } from './peticiones.publicaciones.service';
import { AuthService } from '../../auth/services/auth-service';

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
    private peticiones: PeticionesPublicacionesservice,
    private authService: AuthService
  ) { }

  ngOnInit() {
    console.log("Componente de publicaciones cargado")
    console.log(this.authService.usuarioLogueado)
    this.cargarPublicaciones();
  }

  cargarPublicaciones() {

    const offset = (this.paginaActual - 1) * this.limit;

    this.peticiones.peticionCargarPublicaciones(offset, this.limit, this.orden)
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