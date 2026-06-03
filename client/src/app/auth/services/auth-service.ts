import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  usuarioLogueado: any = null;

  logueoExitoso: boolean = false;

}
