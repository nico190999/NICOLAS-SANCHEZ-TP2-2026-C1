import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../auth/services/auth-service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  imports: [ReactiveFormsModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export default class Usuarios {

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router
  ) { }

  usuarios: any[] = [];

  habilitaroFormularioRegistro: boolean = false;

  ngOnInit() {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.http.get<any[]>(`${environment.apiUrl}/usuarios`)
      .subscribe({
        next: (respuesta) => {
          this.usuarios = respuesta.filter(usuario => usuario._id !== this.authService.usuarioLogueado._id);
          console.log("Datos de usuarios: ", this.usuarios)
          this.cdr.detectChanges()
        },
        error: (error) => {
          console.log("No se ejecuto la respuesta para obtener los usuarios", error)
        }
      })
  }

  inhabilitarUsuario(usuario: any) {
    this.http.delete(`${environment.apiUrl}/usuarios/${usuario._id}`)
      .subscribe({
        next: (respuesta) => {
          console.log("Se inhabilito el usuario", respuesta)
          this.obtenerUsuarios()
        },
        error: (error) => {
          console.log("No se ejecuto la petición para inhabilitar usuario", error);
        }
      })
  }

  habilitarUsuario(usuario: any) {
    this.http.post(`${environment.apiUrl}/usuarios/${usuario._id}/activar`, {})
      .subscribe({
        next: (respuesta) => {
          console.log("Se habilito el usuario", respuesta)
          this.obtenerUsuarios()
        },
        error: (error) => {
          console.log("No se ejecuto la petición para inhabilitar usuario", error);
        }
      })
  }


  //----------------------- REGISTRO ---------------------
  inhabilitarFormularioRegistro(){
    this.habilitaroFormularioRegistro = false;
  }

  habilitarFormularioRegistro(){
    this.habilitaroFormularioRegistro = true;
  }

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

    perfil: new FormControl("", Validators.required)

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
    formData.append('perfil', this.formulario.value.perfil ?? '');

    if (this.archivoSeleccionado) {
      formData.append('imagen', this.archivoSeleccionado);
    }

    //Realiza petición de tipo POST, y se le envian los valores del formulario (this.formulario.value)
    this.http.post(`${environment.apiUrl}/auth/registroComoAdmin`,
      formData
    )
      //En cuanto llegue la respuesta llegue, se ejecuta el subscribe
      .subscribe({
        //Si sale todo bien se ejecuta el next
        next: (respuesta) => {
          console.log('Se registro el Usuario en MongoDB', respuesta);
          this.inhabilitarFormularioRegistro()
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  
}
