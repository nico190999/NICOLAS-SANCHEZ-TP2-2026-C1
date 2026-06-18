import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './auth/services/auth-service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { SesionService } from './auth/services/sesion.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  router = inject(Router);

  constructor(
    public authService: AuthService,
    public sesionService: SesionService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {

    this.authService.autorizar()
      .subscribe({
        next: (resp: any) => {
          console.log("TOKEN VALIDO");
          console.log(resp);
          this.authService.usuarioLogueado = resp.usuario;
          this.authService.logueoExitoso = true;
          this.authService.cargando = false;
          this.router.navigate(['/publicaciones'])
          this.cdr.detectChanges()
        },

        error: (err) => {
          console.log("Token expirado, se vuelve al login");
          this.authService.usuarioLogueado = null;
          this.authService.logueoExitoso = false;
          this.authService.cargando = false;
          this.router.navigate(['/auth/login'])
          this.cdr.detectChanges()
        }
      });
  }


  cerrarSesion() {
    this.authService.logueoExitoso = false;
    this.authService.usuarioLogueado = null;
    this.authService.cerrarSesion();
    this.router.navigate(['/auth/login']);
    this.sesionService.mostrarModal = false;
    this.cdr.detectChanges()
  }



  extenderSesion() {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No existe token");
      return;
    }

    this.sesionService.extenderSesion(token)
      .subscribe({
        next: (respuesta) => {
          localStorage.setItem(
            "token",
            respuesta.token
          );
          this.sesionService.reiniciarContador();
          this.cdr.detectChanges()
        },
        error: (err) => {
          console.log("ERROR REFRESCANDO TOKEN", err);
          this.sesionService.mostrarModal = false;
        }
      })
  }

}
