import { Directive, ElementRef } from '@angular/core';


@Directive({
    selector: '[appAgrandarLetra]',
    standalone: true
})
export class AgrandarLetraDirective {


    constructor(
        private elemento: ElementRef
    ) {

        this.elemento.nativeElement.style.fontSize = "20px";

    }


}