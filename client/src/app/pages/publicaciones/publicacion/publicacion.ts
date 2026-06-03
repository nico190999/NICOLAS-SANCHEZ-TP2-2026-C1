import { Component, Input } from '@angular/core';
import { AuthService } from '../../../auth/services/auth-service';

@Component({
  selector: 'app-publicacion',
  imports: [],
  templateUrl: './publicacion.html',
  styleUrl: './publicacion.css',
})
export class Publicacion {

  constructor(private authService: AuthService){};

  @Input()
  idUsuario:any;

  @Input()
  nombreDeUsuario:any;

  @Input()
  contenido:any;

  @Input()
  fecha:any;

  @Input()
  likes:any;

  @Input()
  descripcion:any;

  @Input()
  comentarios:any;


}
