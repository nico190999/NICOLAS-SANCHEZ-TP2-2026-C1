import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {


  usuarioLogueado: any = null;

  token: string | null = null;

  logueoExitoso: boolean = false;

  cargando = true;

  constructor(
    private http: HttpClient
  ) { }

  autorizar() {

    const token = localStorage.getItem("token");

    console.log("TOKEN ENVIADO:", token);

    if (!token) {
      return throwError(() => ({mensaje: "No existe sesión"}));
    }

    return this.http.post(`${environment.apiUrl}/auth/autorizar`,{ token });
  }


  guardarSesion(respuesta: any) {
    this.token = respuesta.token;
    this.usuarioLogueado = respuesta.usuario;
    this.logueoExitoso = true;

    localStorage.setItem("token", respuesta.token);

    localStorage.setItem("usuario", JSON.stringify(respuesta.usuario));
  }

  cargarSesion() {
    this.token = localStorage.getItem("token");

    const usuario =
      localStorage.getItem("usuario");
    if (usuario) {
      this.usuarioLogueado =
        JSON.parse(usuario);
      this.logueoExitoso = true;
    }
  }

  cerrarSesion() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    this.token = null;
    this.usuarioLogueado = null;
    this.logueoExitoso = false;
  }

  validarToken() {

    return this.http.post(
      `${environment.apiUrl}/auth/autorizar`,
      {
        token: this.token
      }
    )

  }




}