import { Directive, ElementRef, HostListener } from '@angular/core';


@Directive({
  selector: '[appHover]',
  standalone: true
})
export class HoverDirective {


  constructor(
    private elemento: ElementRef
  ) { }



  @HostListener('mouseenter')
  entrar() {

    this.elemento.nativeElement.style.background = "#ffffff";

  }



  @HostListener('mouseleave')
  salir() {

    this.elemento.nativeElement.style.background = "";

  }


}