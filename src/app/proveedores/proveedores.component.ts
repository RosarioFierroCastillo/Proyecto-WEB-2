import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProveedoresService } from './proveedores.service';
import { Proveedor } from './proveedor.model';
import { DataService } from '../data.service';
@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent {
  idFraccionamiento: number | undefined;
  respuestaProveedores: string | null = null;
  proveedores: Proveedor[] = [];
  
  constructor(private ProveedoresService: ProveedoresService, private dataservice:DataService) {}

  ngOnInit(): void {
    //MARIANA, QUI VA A IR EL ID DEL FRACCIONAMIENTO DEL TESORERO
    //OJOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
    //this.idFraccionamiento = 15;
    //MARIANA, QUI VA A IR EL ID DEL FRACCIONAMIENTO DEL TESORERO
    //OJOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
    this.cargarProveedores(this.dataservice.obtener_usuario(3));
  }

  agregarProveedor(formulario: any): void {
    const idFraccionamiento = this.dataservice.obtener_usuario(3); //MARIANA, QUI VA A IR EL ID DEL FRACCIONAMIENTO DEL TESORERO
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
        this.cargarProveedores(this.dataservice.obtener_usuario(3));//MARIANA, QUI VA A IR EL ID DEL FRACCIONAMIENTO DEL TESORERO
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
    const idFraccionamiento = this.dataservice.obtener_usuario(3); // OJOOOOOOOOOOOOOOOOOOO MARIANA
  
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
    this.cargarProveedores(this.dataservice.obtener_usuario(3));
  }



  //Cargar los datos del proveedor seleccionado 
  proveedorModel = {
    idFraccionamiento: '',
    nombre: '',
    apellido_Paterno: '',
    apellido_Materno: '',
    telefono: '',
    tipo: '',
    direccion: '',
    funcion: ''
  };
  @ViewChild('proveedorForm', { static: false }) proveedorForm!: ElementRef<HTMLFormElement>;

  cargarDatosProveedor(proveedorSeleccionado: Proveedor) {
   
    this.proveedorModel = {
      idFraccionamiento: String(proveedorSeleccionado.id_fraccionamiento),
      nombre: proveedorSeleccionado.nombre,
      apellido_Paterno: proveedorSeleccionado.apellido_paterno,
      apellido_Materno: proveedorSeleccionado.apellido_materno,
      telefono: proveedorSeleccionado.telefono,
      tipo: proveedorSeleccionado.tipo,
      direccion: proveedorSeleccionado.direccion,
      funcion: proveedorSeleccionado.funcion
    };
  }



  
}


/*

<a class="btn btn-sm text-white btn-success" style="margin-right: auto;">
          <span class="glyphicon glyphicon-pencil" aria-hidden="true" (click)="cargarDatosProveedor(proveedor)"></span>
          </a>

          */



/*

          <span class="glyphicon glyphicon-remove" aria-hidden="false" (click)="eliminarProveedor(proveedor.id_proveedor)"></span>



*/
