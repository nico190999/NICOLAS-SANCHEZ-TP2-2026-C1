import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  usuarioLogueado: any = null;

  logueoExitoso: boolean = false;

}
