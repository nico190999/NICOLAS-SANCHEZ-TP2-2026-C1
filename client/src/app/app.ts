import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { AuthService } from './auth/services/auth-service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  router = inject(Router);

  constructor(
    public authService: AuthService
  ) { }

  cerrarSesion(){
    this.authService.logueoExitoso = false;
    this.authService.usuarioLogueado = null;
    this.router.navigate(['/auth/login']);
  }

}
