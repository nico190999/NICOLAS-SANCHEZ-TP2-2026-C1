import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export default class Login {

  router = inject(Router);

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  formulario = new FormGroup({

    correo: new FormControl("", Validators.required),

    contrasenia: new FormControl("", Validators.required)

  })

  login() {

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.http.post(`${environment.apiUrl}/auth/login`, this.formulario.value)
      .subscribe({
        next: (respuesta) => {
          console.log('Login exitoso. Id del usuario a continuación');
          this.authService.logueoExitoso = true;
          this.authService.usuarioLogueado = respuesta;
          this.router.navigate(['/publicaciones']);
          console.log(this.authService.usuarioLogueado.usuario._id)
        },

        error: (error) => {
          console.log('Error de login');
          console.log(error);
        }
      });


  }

  loginRapido() {
    this.formulario.patchValue({ correo: "nico123@gmail.com", contrasenia: "nico123" })
  }

  loginRapido2() {
    this.formulario.patchValue({ correo: "nico1@gmail.com", contrasenia: "nico1" })
  }



  //---------------------------SUBIR IMAGEN ------------
  archivoSeleccionado!: File;

  seleccionarArchivo(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files?.length) {
      this.archivoSeleccionado = input.files[0];
    }
  }

  subir() {
    const formData = new FormData();

    formData.append('archivo', this.archivoSeleccionado);

    this.http.post<{ url: string }>(
      'http://localhost:3000/publicaciones/subirImagen',
      formData
    )
      .subscribe({
        next: (resp) => {
          console.log(resp.url);
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  //---------------------------SUBIR IMAGEN ------------

}


/* 

Usuario de prueba 
nico123@gmail.com
nico123

*/