import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proveedor } from './proveedor.model';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {


  //private apiUrl = 'https://localhost:44397/Proveedores'; // URL base 
  private apiUrl = 'https://localhost:7274/Proveedores'; // URL base 

  constructor(private http: HttpClient) { }

  agregarProveedor(idFraccionamiento: number,nombre: string,apellidoPaterno: string,apellidoMaterno: string,telefono: string,tipo: string,direccion: string,funcion: string): Observable<string> {
    const url = `${this.apiUrl}/Agregar_Proveedor?id_fraccionamiento=${idFraccionamiento}&nombre=${nombre}&apellido_paterno=${apellidoPaterno}&apellido_materno=${apellidoMaterno}&telefono=${telefono}&tipo=${tipo}&direccion=${direccion}&funcion=${funcion}`;
    return this.http.post(url, {},{ responseType: 'text' });
  }
  

  eliminarProveedor(id_proveedor: number, id_fraccionamiento: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/Eliminar_Proveedor?&id_fraccionamiento=${id_fraccionamiento}&id_proveedor=${id_proveedor}`,{ responseType: 'text' });
  }

  actualizarProveedor(id_proveedor: number, id_fraccionamiento: number, nombre: string, apellido_paterno: string, apellido_materno: string, telefono: string, tipo: string, direccion: string, funcion: string): Observable<string> {
    return this.http.patch(`${this.apiUrl}/Actualizar_Proveedor?id_proveedor=${id_proveedor}&id_fraccionamiento=${id_fraccionamiento}&nombre=${nombre}&apellido_paterno=${apellido_paterno}&apellido_materno=${apellido_materno}&telefono=${telefono}&tipo=${tipo}&direccion=${direccion}&funcion=${funcion}`, {},{ responseType: 'text' });
  }

  consultarProveedores(id_fraccionamiento: number): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(`${this.apiUrl}/Consultar_Proveedor?id_fraccionamiento=${id_fraccionamiento}`);
  }
}
