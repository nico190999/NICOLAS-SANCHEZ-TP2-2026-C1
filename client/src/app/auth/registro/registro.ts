import { Component } from '@angular/core';
import { inject, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export default class Registro {

  http = inject(HttpClient);

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

    imagenPerfil: new FormControl(null),

    perfil: new FormControl('usuario')

  })

  usuarioYaRegistrado = false;
  registroExitoso = false;


  cdr = inject(ChangeDetectorRef);

  contraseniasCoinciden(): boolean {
    return (
      this.formulario.get('contrasenia')?.value ===
      this.formulario.get('repetirContrasenia')?.value
    );
  }

  registrar(){
    if (this.formulario.invalid) {
    this.formulario.markAllAsTouched();
    return;
  }

  this.http.post(
    'https://nicolas-sanchez-tp-2-2026-c1-server.vercel.app/registro',
    this.formulario.value
  )
  .subscribe({

    next: (respuesta) => {

      console.log('Usuario registrado');
      console.log(respuesta);

      this.registroExitoso = true;
    },

    error: (error) => {

      console.log(error);
    }
  });
  }

}
