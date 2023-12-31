import { Component } from '@angular/core';
import { NotificacionesService } from '../notificaciones/notificaciones.service';
import { Notificaciones } from '../notificaciones/notificaciones.model';
import { DataService } from '../data.service';
import { Data } from '@angular/router';

@Component({
  selector: 'app-notificaciones-usuarios',
  templateUrl: './notificaciones-usuarios.component.html',
  styleUrls: ['./notificaciones-usuarios.component.css']
})
export class NotificacionesUsuariosComponent {
  notificaciones: Notificaciones[] = [];
  tipoSeleccionado: string = 'General';
  idFraccionamiento: number = 15;
  idUsuario: number = 0;

  constructor(private notificacionesService: NotificacionesService,private dataService:DataService) {}

  ngOnInit(): void {
    this.idFraccionamiento=this.dataService.obtener_usuario(3);
    this.actualizarNotificaciones();
  }

  actualizarNotificaciones(): void {
    this.notificaciones = []; // Vaciar el arreglo antes de cargar nuevas notificaciones

    if (this.tipoSeleccionado === 'General') {
      this.idUsuario = 0;
    } else {
      this.idUsuario = this.dataService.obtener_usuario(1);
    }

    this.notificacionesService.consultarNotificacionesPorId(this.idFraccionamiento, this.idUsuario)
      .subscribe(
        (notificaciones: Notificaciones[]) => {
          console.log(notificaciones);
          this.notificaciones = notificaciones;
        },
        (error) => {
          console.error('Error al obtener las notificaciones:', error);
          // Manejo de errores
        }
      );
  }

  filtrarPorTipo(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.tipoSeleccionado = target.value;
    this.actualizarNotificaciones();
  }
}
