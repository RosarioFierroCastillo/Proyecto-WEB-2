import { Component } from '@angular/core';
import { Acuerdos } from '../acuerdos/acuerdos.model';
import { AcuerdosService } from '../acuerdos/acuerdos.service';
@Component({
  selector: 'app-acuerdos-usuarios',
  templateUrl: './acuerdos-usuarios.component.html',
  styleUrls: ['./acuerdos-usuarios.component.css']
})
export class AcuerdosUsuariosComponent {

  acuerdos: Acuerdos[] = [];
  constructor(private acuerdosService: AcuerdosService) {}

  ngOnInit(): void {
    this.consultarAcuerdos();
  }

  consultarAcuerdos(): void {
    const idFraccionamiento = 15; 
    this.acuerdosService.consultarAcuerdos(idFraccionamiento).subscribe(
      (data: Acuerdos[]) => {
        this.acuerdos = data;
      },
      (error) => {
        console.error('Error al obtener acuerdos:', error);
        // Manejo de errores
      }
    );
  }

}
