import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ChangeDetectorRef } from '@angular/core';
import { ResaltarDirective } from '../../directivas/resaltar';
import { SesionService } from '../services/sesion.service';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, ResaltarDirective],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export default class Login {

  router = inject(Router);

  usuarioInhabilitado = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private sesionService: SesionService
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
          console.log('Respuesta login', respuesta);
          this.authService.guardarSesion(respuesta);
          this.authService.logueoExitoso = true;
          this.usuarioInhabilitado = false;
          this.sesionService.iniciarContador();
          this.router.navigate(['/publicaciones']);
        },
        error: (error) => {
          /* console.log('Error de login', error); */

          if (error.error.codigo === "USUARIO_INHABILITADO") {
            console.log("Entre en usuario inhabilitado");
            this.usuarioInhabilitado = true;
            this.cdr.detectChanges();

          }
        }
      });
  }

  loginRapido() {
    this.formulario.patchValue({ correo: "nico123@gmail.com", contrasenia: "nico123" })
  }

  loginRapido2() {
    this.formulario.patchValue({ correo: "nico1@gmail.com", contrasenia: "nico1" })
  }

  loginRapidoAdmin() {
    this.formulario.patchValue({ correo: "admin@gmail.com", contrasenia: "admin" })
  }



}


/* 

Usuario de prueba 
nico123@gmail.com
nico123

*/