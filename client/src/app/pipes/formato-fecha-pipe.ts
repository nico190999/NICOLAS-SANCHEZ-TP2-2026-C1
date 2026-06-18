import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'formatoFecha',
  standalone: true
})
export class FormatoFechaPipe implements PipeTransform {


  transform(fecha: string) {

    const f = new Date(fecha);


    return f.toLocaleDateString();

  }


}