import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './estadisticas.html',
  styleUrl: './estadisticas.css'
})
export default class Estadisticas {


  desde = "";
  hasta = "";


  constructor(
    private http: HttpClient
  ) { }



  cargarEstadisticas() {
    this.http.get<any[]>(
      `${environment.apiUrl}/estadisticas/publicaciones?desde=${this.desde}&hasta=${this.hasta}`
    )
      .subscribe(datos => {
        console.log("PUBLICACIONES:", datos);
        new Chart("graficoPublicaciones", {
          type: 'bar',
          data: {
            labels: datos.map(x => x._id),
            datasets: [{
              label: 'Publicaciones',
              data: datos.map(x => x.cantidad)
            }]
          }
        })
      })




    this.http.get<any[]>(
      `${environment.apiUrl}/estadisticas/comentarios?desde=${this.desde}&hasta=${this.hasta}`
    )
      .subscribe(datos => {
        console.log("COMENTARIOS:", datos);
        if (datos.length === 0) {
          return;
        }
        new Chart("graficoComentarios", {
          type: 'pie',
          data: {
            labels: datos.map(x => x._id),
            datasets: [{
              label: 'Comentarios',
              data: datos.map(x => x.cantidad)
            }]
          }
        })
      })
  }



}