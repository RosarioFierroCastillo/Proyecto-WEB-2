import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notificaciones } from './notificaciones.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  

  private apiUrl = 'https://localhost:7274/Notificaciones/'; // URL base de la API

  constructor(private http: HttpClient) {}

  agregarNotificacion(idFraccionamiento: number, tipo: string, idDestinatario: number, asunto: string, mensaje: string) {
    const url = `${this.apiUrl}Agregar_Notificacion?id_fraccionamiento=${idFraccionamiento}&tipo=${tipo}&id_destinatario=${idDestinatario}&asunto=${asunto}&mensaje=${mensaje}`;
    return this.http.post(url, {}, { responseType: 'text' });
  }

  consultarNotificacionPorId(idFraccionamiento: number, idDestinatario: number) {
    const url = `${this.apiUrl}Consultar_Notificacion?id_fraccionamiento=${idFraccionamiento}&id_destinatario=${idDestinatario}`;
    return this.http.get<Notificaciones[]>(url);
  }

  eliminarNotificacion(idNotificacion: number) {
    const url = `${this.apiUrl}Eliminar_Notificacion?id_notificacion=${idNotificacion}`;
    return this.http.delete(url,{ responseType: 'text' });
  }

  consultarNotificacionesPorId(idFraccionamiento: number, idUsuario: number): Observable<Notificaciones[]> {
    const url = `${this.apiUrl}consultar_Notificacion?id_fraccionamiento=${idFraccionamiento}&id_destinatario=${idUsuario}`;
    return this.http.get<Notificaciones[]>(url);
  }

  
}
