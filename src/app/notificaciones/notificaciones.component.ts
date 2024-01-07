import { Component } from '@angular/core';
import { Personas } from './personas.model'; 
import { PersonasService } from './personas.service';
import { NotificacionesService } from '../notificaciones/notificaciones.service';
import { Notificaciones } from './notificaciones.model';
import { usuario, usuarios } from "../modelos/usuarios";
import { DataService } from '../data.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent {
  constructor(private personasService: PersonasService, private NotificacionesService:NotificacionesService,
    private notificacionesService:NotificacionesService,private dataservice:DataService ) { }
  personas: Personas[] = [];

  id_fraccionamineto: number=15;
  respuestaNotificacion: string | null = null;
  idNotificacion: number | undefined;
  notificaciones: Notificaciones[] = [];
  tipoSeleccionado: string = 'General';
  //idFraccionamiento: number = 15;
  idUsuario: number = 0;
  filtroNotificaciones: "" | undefined;
  usuarios: usuarios[] = [];

  

  ngOnInit(): void {
    this.id_fraccionamineto=this.dataservice.obtener_usuario(3);
    this.consultarPersonas(this.id_fraccionamineto);
    this.consultarTodasNotificaciones();
    
  }


  eliminarNotificacionPorId(id_notificacion:number): void {
    this.idNotificacion=id_notificacion;
    if (this.idNotificacion !== undefined) {
      this.NotificacionesService.eliminarNotificacion(this.idNotificacion ) // Agrega el id_fraccionamiento si es necesario
        .subscribe(
          (respuesta: string) => {
            this.respuestaNotificacion =respuesta;
            console.log('Respuesta al eliminar notificación:', respuesta);
            Swal.fire({
              title: 'Notificacion eliminada correctamente',
              text: '',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
            this.actualizarNotificaciones();
          },
          (error) => {
            this.respuestaNotificacion =error;
            console.error('Error al eliminar notificación:', error);
            // Manejo de errores
          }
        );
    } else {
      this.respuestaNotificacion ='El ID de notificación es inválido';
      console.error('El ID de notificación es inválido');
    }
  }

  consultarNotificacionPorId(idFraccionamiento: number, idDestinatario: number): void {
    this.NotificacionesService.consultarNotificacionPorId(idFraccionamiento, idDestinatario)
      .subscribe(
        (notificaciones: Notificaciones[]) => {
          console.log('Notificaciones consultadas:', notificaciones);
          // Aquí puedes manejar las notificaciones devueltas por la API
        },
        (error) => {
          console.error('Error al consultar notificación:', error);
          // Manejo de errores
        }
      );
  }

  agregarNotificacion(formulario: any): void {
    //const idFraccionamiento = parseInt(formulario.fraccionamiento);
    const idFraccionamiento = this.id_fraccionamineto;
    //console.log(idFraccionamiento);
    const tipo = formulario.tipo;
    console.log(tipo);
    let destinatarioId=0;
    if(tipo=='general'){
    destinatarioId=0;
    }else if(tipo=='individual'){
      destinatarioId = parseInt(formulario.destinatario.split(' - ')[0]);
    }else{
      return;
    }
    //console.log(destinatarioId);
    const asunto = formulario.asunto;
    //console.log(asunto);
    const mensaje = formulario.mensaje;
    //console.log(mensaje);

    this.NotificacionesService.agregarNotificacion(idFraccionamiento, tipo, destinatarioId, asunto, mensaje)
      .subscribe(
        (respuesta: string) => {
          this.respuestaNotificacion =respuesta;
          console.log('Respuesta:', respuesta);
          Swal.fire({
            title: 'Notificacion agregada correctamente',
            text: '',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.actualizarNotificaciones();
        },
        (error) => {
          console.error('Error al agregar notificación Angular:', error);
          Swal.fire({
            title: 'Error al agregar notificación',
            text: '',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        
        }
      );
  }

  consultarPersonas(idFraccionamiento: number): void {
    this.personasService.consultarPersonasPorFraccionamiento(idFraccionamiento).subscribe(
      (personas: Personas[]) => {
       this.personas = personas;
        console.log('Personas:', personas);
      },
      (error) => {
        // Manejo de errores
        console.error('Error:', error);
        Swal.fire({
          title: 'Error al consultar a las personas',
          text: 'Contacte con el administrador de la pagina',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    );
  }

  consultarTodasNotificaciones(){
    this.notificaciones = []; // Vaciar el arreglo antes de cargar nuevas notificaciones
      this.idUsuario = 0;
    

    this.notificacionesService.consultarNotificacionesPorId(this.id_fraccionamineto, this.idUsuario)
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





  actualizarNotificaciones(): void {
    this.notificaciones = []; // Vaciar el arreglo antes de cargar nuevas notificaciones

    if (this.tipoSeleccionado === 'General') {
      this.idUsuario = 0;
    } else {
      // Asignar el ID de usuario correspondiente a la sesión (puedes ajustarlo según tu lógica de inicio de sesión)
      // this.idUsuario = ...;
      this.idUsuario = 1;
    } 

    this.notificacionesService.consultarNotificacionesPorId(this.id_fraccionamineto, this.idUsuario)
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
