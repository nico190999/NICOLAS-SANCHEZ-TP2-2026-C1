import { Directive, ElementRef } from '@angular/core';


@Directive({
  selector: '[appResaltar]',
  standalone: true
})
export class ResaltarDirective {


  constructor(
    private elemento: ElementRef
  ) {

    this.elemento.nativeElement.style.color = "red";

    this.elemento.nativeElement.style.fontFamily = "Georgia, serif";

    this.elemento.nativeElement.style.fontWeight = "bold";

  }


}