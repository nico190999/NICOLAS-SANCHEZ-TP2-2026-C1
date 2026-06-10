import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PeticionesPublicacionesservice {

  constructor(
    private http: HttpClient
  ) { }

  peticionCargarPublicaciones(offset: number, limit: number, orden: string, usuarioId?: string) {
    console.log("Ingresa a petición para obtener las publicaciones")
    let url = `${environment.apiUrl}/publicaciones?offset=${offset}&limit=${limit}&orden=${orden}`

    if (usuarioId) {
      url = url + `&usuarioId=${usuarioId}`
    }

    return this.http.get(url)
  }

  peticionPublicar(formData: FormData) {
    return this.http.post(`${environment.apiUrl}/publicaciones/publicar`, formData)
  }

}
