import { Component } from '@angular/core';
import { AuthService } from '../../auth/services/auth-service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-mi-perfil',
  imports: [ReactiveFormsModule],
  templateUrl: './mi-perfil.html',
  styleUrl: './mi-perfil.css',
})
export default class MiPerfil {

  http = inject(HttpClient);

  usuario: any;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.usuario = this.authService.usuarioLogueado.usuario;
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

    this.http.post(`${environment.apiUrlLocal}/publicaciones/publicar`, nuevaPublicacion).subscribe({
      next: (respuesta) => {
        console.log("Se ejecuto correctamente la respuesta")
        console.log(respuesta)
      },
      error: (err) => {

        console.log(err.error);

        console.log(err.error.message);

      }
    })

  }

}
