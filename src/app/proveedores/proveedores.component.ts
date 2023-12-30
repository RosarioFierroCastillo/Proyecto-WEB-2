import { Component } from '@angular/core';
import { ProveedoresService } from './proveedores.service';
import { Proveedor } from './proveedor.model';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent {
  idFraccionamiento: number | undefined;
  respuestaProveedores: string | null = null;
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

  agregarProveedor(formulario: any): void {
    const idFraccionamiento = 15; //MARIANA, QUI VA A IR EL ID DEL FRACCIONAMIENTO DEL TESORERO
    //OJOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
    const nombre = formulario.nombre;
    const apellidoPaterno = formulario.apellido_Paterno;
    const apellidoMaterno = formulario.apellido_Paterno;
    const telefono = formulario.telefono;
    const tipo = formulario.tipo;
    const direccion = formulario.direccion;
    const funcion = formulario.funcion;
  
    this.ProveedoresService.agregarProveedor(
      idFraccionamiento,
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      telefono,
      tipo,
      direccion,
      funcion
    ).subscribe(
      (respuesta: string) => {
        this.respuestaProveedores=respuesta;
        this.cargarProveedores(15);//MARIANA, QUI VA A IR EL ID DEL FRACCIONAMIENTO DEL TESORERO
        //OJOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
        console.log('Respuesta:', respuesta);
      },
      (error) => {
        console.error('Error al agregar proveedor Angular:', error);
        // Manejo de errores
      }
    );
    
    
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

  eliminarProveedor(idProveedor: number): void {
    const idFraccionamiento = 15; // OJOOOOOOOOOOOOOOOOOOO MARIANA
  
    this.ProveedoresService.eliminarProveedor(idFraccionamiento, idProveedor).subscribe(
      (respuesta: string) => {
        console.log('Respuesta:', respuesta);
        this.respuestaProveedores=respuesta;
        this.cargarProveedores(idFraccionamiento); // Vuelve a cargar la lista después de eliminar
      },
      (error) => {
        console.error('Error al eliminar proveedor:', error);
      }
    );
  }



  
}
