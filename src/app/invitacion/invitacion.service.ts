import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invitacion } from './invitacion.model';

@Injectable({
  providedIn: 'root'
})
export class InvitacionService {

  constructor(private http: HttpClient) { }


//private apiUrl = 'https://evaluacionesuas-001-site1.gtempurl.com/Acuerdos';
private apiUrl = 'https://localhost:7274/Usuarios'; 

generarInvitacion(token: string,correo_electronico: string, id_fraccionamiento: number) {
  return this.http.post(`${this.apiUrl}/Generar_invitacion?token=${token}&correo_electronico=${correo_electronico}&id_fraccionamiento=${id_fraccionamiento}`,{}, { responseType: 'text' });
}


obtenerDatosInvitacion(token: string): Observable<Invitacion[]> {
  return this.http.get<Invitacion[]>(`${this.apiUrl}/Consultar_invitacion?token=${token}`);
}
  
}