import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './auth/services/auth-service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  router = inject(Router);

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {

    this.authService.autorizar()
      .subscribe({
        next: (resp: any) => {
          console.log("TOKEN VALIDO");
          console.log(resp);
          this.authService.usuarioLogueado = resp;
          this.authService.logueoExitoso = true;
          this.authService.cargando = false;
        },

        error: (err) => {
          console.log("Sin sesion");
          this.authService.usuarioLogueado = null;
          this.authService.logueoExitoso = false;
          this.authService.cargando = false;
        }
      });
  }


  cerrarSesion() {
    this.authService.logueoExitoso = false;
    this.authService.usuarioLogueado = null;
    this.authService.cerrarSesion();
    this.router.navigate(['/auth/login']);
  }

}
