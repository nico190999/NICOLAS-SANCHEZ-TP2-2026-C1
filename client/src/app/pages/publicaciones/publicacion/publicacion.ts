import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../auth/services/auth-service';
import { ChangeDetectorRef } from '@angular/core';
import { ɵInternalFormsSharedModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from "@angular/forms";
import { OnInit } from '@angular/core';
import { PeticionesPublicacionservice } from './peticiones.publicacion.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-publicacion',
  standalone: true,
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, FormsModule],
  templateUrl: './publicacion.html',
  styleUrl: './publicacion.css',
})
export class Publicacion implements OnInit {

  constructor(
    public authService: AuthService,
    private cdr: ChangeDetectorRef,
    private peticiones: PeticionesPublicacionservice
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

  listaComentarios: any[] = [];

  cantidadComentarios = 3;

  offsetComentarios = 0;

  //------------------------------------

  aniadirComentarioFlag = false;

  ngOnInit() {

    this.cargarComentariosIniciales();

  }

  formularioComentario = new FormGroup({
    comentario: new FormControl("", Validators.required)
  })

  agregarComentario() {
    if (this.formularioComentario.invalid) {
      return;
    }

    const nuevoComentario = {
      idPublicacion: this.idPublicacion,
      idUsuario: this.authService.usuarioLogueado?._id,
      nombreDeUsuario: this.authService.usuarioLogueado?.nombreDeUsuario,
      mensaje: this.formularioComentario.value.comentario,
      fecha: new Date().toISOString()
    };

    console.log(nuevoComentario)

    this.peticiones.peticionAgregarComentario(nuevoComentario)
      .subscribe({
        next: () => {
          console.log("Comentario agregado");
          this.formularioComentario.reset();
          this.aniadirComentarioFlag = false;
          this.cargarComentariosIniciales();
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.log(err);
        }
      });

  }

  cargarComentariosIniciales() {

    this.listaComentarios = [];
    this.offsetComentarios = 0;

    this.cargarComentarios();

  }

  cargarComentarios() {
    this.peticiones.peticionCargarcomentarios(this.idPublicacion, this.offsetComentarios, this.cantidadComentarios)
      .subscribe({
        next: (resp) => {
          this.listaComentarios = [
            ...this.listaComentarios,
            ...resp
          ].filter(
            (comentario, index, self) =>
              index === self.findIndex(c => c._id === comentario._id)
          );;
          this.offsetComentarios += resp.length;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.log(err)
        }
      });

  }


  eliminarPublicacion() {
    this.peticiones.peticionEliminarPublicacion(this.idPublicacion).subscribe({
      next: () => {
        console.log("Se elimino la publicación")
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  /* darLike() {
    const usuarioId =
      this.authService.usuarioLogueado?._id;
    if (!usuarioId) {
      return;
    }

    this.peticiones.peticionDarLike(this.idPublicacion, usuarioId)
      .subscribe({
        next: () => {
          console.log("Likeaste la publicación")
          this.cdr.detectChanges()
        },
        error: (err) => {
          console.log(err);
        }
      });
  } */

  darLike() {
    this.peticiones.peticionDarLike(this.idPublicacion)
      .subscribe({
        next: () => {
          console.log("Likeaste la publicación");
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  quitarLike() {
    const usuarioId = this.authService.usuarioLogueado?._id;

    if (!usuarioId) {
      return;
    }

    this.peticiones.peticionQuitarLike(this.idPublicacion, usuarioId)
      .subscribe({
        next: () => {
          console.log("Quitaste el like a la publicación")
          this.cdr.detectChanges()
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  comentarioEditandoId: string | null = null;

  mensajeEditando: string = "";

  editarComentario(comentario: any) {

    this.comentarioEditandoId = comentario._id;

    this.mensajeEditando = comentario.mensaje;

  }

  guardarComentarioEditado(comentario: any) {
    this.peticiones.peticionModificarComentario(comentario._id, this.mensajeEditando)
      .subscribe({
        next: () => {
          console.log("Comentario modificado");
          comentario.mensaje = this.mensajeEditando;
          comentario.modificado = true;
          this.comentarioEditandoId = null;
          this.mensajeEditando = "";
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.log(err);
        }
      });
  }


  //---------------------------------

  habilitarFormularioComentario() {
    this.aniadirComentarioFlag = true;
  }

  inhabilitarFormularioComentario() {
    this.aniadirComentarioFlag = false;
  }

  esMia(): boolean {

    return this.authService.usuarioLogueado?._id === this.idUsuario;

  }

  usuarioYaDioLike(): boolean {

    const usuarioId =
      this.authService.usuarioLogueado?._id;

    if (!usuarioId) {
      return false;
    }

    return this.usuariosLikes.includes(usuarioId);
  }

  cargarMasComentarios() {
    this.cargarComentarios();
  }


}
