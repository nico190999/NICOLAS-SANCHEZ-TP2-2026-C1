import { Component } from '@angular/core';
import { AuthService } from '../../auth/services/auth-service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ChangeDetectorRef } from '@angular/core';
import { Publicacion } from '../publicaciones/publicacion/publicacion';

@Component({
  selector: 'app-mi-perfil',
  imports: [ReactiveFormsModule, Publicacion],
  templateUrl: './mi-perfil.html',
  styleUrl: './mi-perfil.css',
})
export default class MiPerfil {

  http = inject(HttpClient);

  paginaActual = 1;
  limit = 3;
  orden = 'fecha';

  publicaciones: any[] = [];
  total = 0;

  usuario: any;

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.usuario = this.authService.usuarioLogueado.usuario;
    this.cargarPublicaciones();
  }

  cargarPublicaciones() {
    const offset = (this.paginaActual - 1) * this.limit;
    
    this.http.get(`${environment.apiUrl}/publicaciones?offset=${offset}&limit=${this.limit}&orden=${this.orden}&usuarioId=${this.usuario._id}`)
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

  crearNuevaPublicacion() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const nuevaPublicacion = {
      idUsuario: this.usuario._id,
      nombreDeUsuario: this.usuario.nombreDeUsuario,
      contenido: this.formulario.value.contenido,
      descripcion: this.formulario.value.descripcion,
      fecha: new Date().toISOString()
    };

    this.http.post(`${environment.apiUrl}/publicaciones/publicar`, nuevaPublicacion).subscribe({
      next: (respuesta) => {
        console.log("Se creó una nueva publicación")
        console.log(respuesta)
        this.crearPublicacionFlag = false;
        this.cdr.detectChanges()
      },
      error: (err) => {

        console.log(err.error);

        console.log(err.error.message);

      }
    })

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

  crearPublicacionFlag: boolean = false;

  formulario = new FormGroup({

    contenido: new FormControl("", Validators.required),

    descripcion: new FormControl("", Validators.required)

  })

  habilitarFormularioDePublicacion() {
    this.crearPublicacionFlag = true;
  }

  deshabilitarFormularioDePublicacion() {
    this.crearPublicacionFlag = false;
  }


}
