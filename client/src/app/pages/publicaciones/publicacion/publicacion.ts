import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../auth/services/auth-service';
import { ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-publicacion',
  standalone: true,
  imports: [],
  templateUrl: './publicacion.html',
  styleUrl: './publicacion.css',
})
export class Publicacion {

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) { };

  @Input()
  idPublicacion: any;

  @Input()
  idUsuario: any;

  @Input()
  nombreDeUsuario: any;

  @Input()
  contenido: any;

  @Input()
  fecha: any;

  @Input()
  likes: any;

  @Input()
  usuariosLikes: string[] = [];

  @Input()
  descripcion: any;

  @Input()
  comentarios: any;

  //----------------- FUNCIONES CON ENVIO DE PETICIONES AL CONTROLADOR-----------------


  eliminarPublicacion() {
    this.http.delete(`${environment.apiUrl}/publicaciones/${this.idPublicacion}`)
      .subscribe({
        next: () => {
          console.log("Se elimino la publicación")
          this.cdr.detectChanges()
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  darLike() {
    const usuarioId =
      this.authService.usuarioLogueado.usuario._id;

    this.http.post(`${environment.apiUrl}/publicaciones/${this.idPublicacion}/like`, { usuarioId })
      .subscribe({
        next: () => {
          console.log("Likeaste la publicación")
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  quitarLike() {
    const usuarioId =
      this.authService.usuarioLogueado.usuario._id;

    this.http.delete(`${environment.apiUrl}/publicaciones/${this.idPublicacion}/like/${usuarioId}`)
      .subscribe({
        next: () => {
          console.log("Quitaste el like a la publicación")
        },
        error: (err) => {
          console.log(err);
        }
      });
  }


  //----------------- FUNCIONES CON ENVIO DE PETICIONES AL CONTROLADOR-----------------


  esMia(): boolean {
    return this.authService.usuarioLogueado.usuario._id === this.idUsuario;
  }

  usuarioYaDioLike(): boolean {

    const usuarioId =
      this.authService.usuarioLogueado.usuario._id;

    return this.usuariosLikes.includes(usuarioId);

  }


}
