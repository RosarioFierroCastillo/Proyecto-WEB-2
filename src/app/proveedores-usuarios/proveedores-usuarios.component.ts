import { Component } from '@angular/core';
import { Proveedor } from '../proveedores/proveedor.model';
import { ProveedoresService } from '../proveedores/proveedores.service';

@Component({
  selector: 'app-proveedores-usuarios',
  templateUrl: './proveedores-usuarios.component.html',
  styleUrls: ['./proveedores-usuarios.component.css']
})
export class ProveedoresUsuariosComponent {
  idFraccionamiento: number | undefined;
  proveedores: Proveedor[] = [];
  

  constructor(private ProveedoresService: ProveedoresService) {}

  ngOnInit(): void {
    //MARIANA, QUI VA A IR EL ID DEL FRACCIONAMIENTO DEL TESORERO
    //OJOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
    this.idFraccionamiento = 15;
    //MARIANA, QUI VA A IR EL ID DEL FRACCIONAMIENTO DEL TESORERO
    //OJOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
    this.cargarProveedores(15);
  }
  cargarProveedores(idFraccionamiento: number): void {
    this.ProveedoresService.consultarProveedores(idFraccionamiento).subscribe(
      (data: Proveedor[]) => {
        this.proveedores = data;
      },
      (error) => {
        console.error('Error al obtener proveedores:', error);
      }
    );
  }

  

}
