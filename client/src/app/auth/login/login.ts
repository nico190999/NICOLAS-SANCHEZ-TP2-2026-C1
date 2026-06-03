import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';


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

    this.http.post(
      'http://localhost:3000/auth/login',
      this.formulario.value
    )
      .subscribe({

        next: (respuesta) => {

          console.log('Login exitoso. Datos del usuario a continuación');
          console.log(respuesta);
          this.authService.logueoExitoso = true;
          this.authService.usuarioLogueado = respuesta;

          this.router.navigate(['/publicaciones']);

          console.log(this.authService.usuarioLogueado._id)


        },

        error: (error) => {

          console.log('Error de login');
          console.log(error);
        }

      });
      

  }

  loginRapido(){
    this.formulario.patchValue({correo: "nico123@gmail.com", contrasenia: "nico123"})
  }

}


/* 

Usuario de prueba 
nico123@gmail.com
nico123

*/