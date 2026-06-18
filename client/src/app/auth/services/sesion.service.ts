import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class SesionService {

    private timer: any;
    public mostrarModal = false;

    constructor(
        private http: HttpClient
    ) { }

    iniciarContador() {
        console.log("Contador iniciado");
        this.timer = setTimeout(() => {
            console.log("Paso el tiempo")
            this.mostrarModal = true;
        }, 600000); //600000 ms = 10 minutos
    }

    extenderSesion(token: string) {
        return this.http.post<any>(
            `${environment.apiUrl}/auth/refrescar`,
            {
                token
            }
        );
    }

    reiniciarContador() {
        clearTimeout(this.timer);
        this.mostrarModal = false;
        this.iniciarContador();
    }
}