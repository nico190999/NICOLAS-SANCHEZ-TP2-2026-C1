import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PublicacionesService {

    constructor(
        private http: HttpClient
    ) { }

    obtenerPublicaciones(
        offset: number,
        limit: number,
        orden: string
    ) {
        return this.http.get(
            `${environment.apiUrlLocal}/publicaciones?offset=${offset}&limit=${limit}&orden=${orden}`
        );
    }
}
