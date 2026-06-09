import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class PeticionesPublicacionservice {

    constructor(
        private http: HttpClient
    ) { }

    peticionAgregarComentario(nuevoComentario: any) {
        return this.http.post(`${environment.apiUrl}/comentarios`, nuevoComentario)
    }

    peticionCargarcomentarios(idPublicacion: string, offset: number, limit: number) {
        return this.http.get<any[]>(`${environment.apiUrl}/comentarios/${idPublicacion}?offset=${offset}&limit=${limit}`);
    }

    peticionEliminarPublicacion(idPublicacion: string) {
        return this.http.delete(`${environment.apiUrl}/publicaciones/${idPublicacion}`)
    }

    peticionDarLike(idPublicacion: string, usuarioId: any) {
        return this.http.post(`${environment.apiUrl}/publicaciones/${idPublicacion}/like`, { usuarioId })
    }

    peticionQuitarLike(idPublicacion: string, usuarioId: any) {
        return this.http.delete(`${environment.apiUrl}/publicaciones/${idPublicacion}/like/${usuarioId}`)
    }

    peticionModificarComentario(idComentario: string, mensaje: string) {
        return this.http.put(`${environment.apiUrl}/comentarios/${idComentario}`, { mensaje });
    }

}
