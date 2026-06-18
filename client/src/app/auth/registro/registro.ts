import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export default class Registro {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  http = inject(HttpClient);
  archivoSeleccionado!: File;

  /* VALIDACIONES DEL FORMULARIO */
  formulario = new FormGroup({

    nombre: new FormControl("", [Validators.minLength(3), Validators.maxLength(15), Validators.required]),/* min de caracteres son 3 y maximo 15, que sea requerido */

    apellido: new FormControl("", Validators.required),

    correo: new FormControl("", [Validators.required, Validators.email]),

    nombreDeUsuario: new FormControl("", Validators.required),

    contrasenia: new FormControl("", Validators.required),

    repetirContrasenia: new FormControl("", Validators.required),

    fechaNacimiento: new FormControl('', [Validators.required]),

    descripcionBreve: new FormControl("", Validators.required),

    imagen: new FormControl(null),

  })

  usuarioYaRegistrado = false;



  contraseniasCoinciden(): boolean {
    return (
      this.formulario.get('contrasenia')?.value ===
      this.formulario.get('repetirContrasenia')?.value
    );
  }

  seleccionarArchivo(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.archivoSeleccionado = input.files[0];
    }
  }

  registrar() {
    //PARA QUE FUNCIONE EL REGISTRO SE DEBE HACER "NEST START" DEL LADO DEL SERVIDOR

    // Si hay errores en el formularios, hace marcar los mismos
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const formData = new FormData();

    formData.append('nombre', this.formulario.value.nombre ?? '');
    formData.append('apellido', this.formulario.value.apellido ?? '');
    formData.append('correo', this.formulario.value.correo ?? '');
    formData.append('nombreDeUsuario', this.formulario.value.nombreDeUsuario ?? '');
    formData.append('contrasenia', this.formulario.value.contrasenia ?? '');
    formData.append('repetirContrasenia', this.formulario.value.repetirContrasenia ?? '');
    formData.append('fechaNacimiento', this.formulario.value.fechaNacimiento ?? '');
    formData.append('descripcionBreve', this.formulario.value.descripcionBreve ?? '');




    if (this.archivoSeleccionado) {
      formData.append('imagen', this.archivoSeleccionado);
    }

    //Realiza petición de tipo POST, y se le envian los valores del formulario (this.formulario.value)
    this.http.post(`${environment.apiUrl}/auth/registro`, /* La URL debe coincidir con la del controlador (autenticacion.controller.ts en @Controller("La ruta")). 
    Para vercel usar https://nicolas-sanchez-tp-2-2026-c1-server.vercel.app/auth/registro.
    Para servidor local usar http://localhost:3000/registro (SE TIENE QUE INICIALIZAR NEST EN EL SERVIDOR MEDIANTE "nest start")
    */
      formData
    )
      //En cuanto llegue la respuesta llegue, se ejecuta el subscribe
      .subscribe({

        //Si sale todo bien se ejecuta el next
        next: (respuesta) => {

          console.log('Se registro el Usuario en MongoDB');
          this.authService.guardarSesion(respuesta);
          this.authService.logueoExitoso = true;
          this.router.navigate(['/publicaciones']);
        },

        error: (error) => {
          console.log(error);
        }
      });
  }

}
