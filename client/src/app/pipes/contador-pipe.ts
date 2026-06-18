import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'contador',
  standalone: true
})
export class ContadorPipe implements PipeTransform {

  transform(valor: number) {
    return `${valor} likes`;
  }


}