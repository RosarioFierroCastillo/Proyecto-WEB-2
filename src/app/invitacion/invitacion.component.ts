import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvitacionService } from './invitacion.service';
import { Invitacion } from './invitacion.model';
import { v4 as uuidv4 } from 'uuid';
import { CorreoService } from './correo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from './usuario.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-invitacion',
  templateUrl: './invitacion.component.html',
  styleUrls: ['./invitacion.component.css']
})
export class InvitacionComponent {
  UserGroup: FormGroup;
  usuario: Usuario= {
    nombre:'',
    apellido_pat: '',
    apellido_mat: '',
    telefono: '',
    fecha_nacimiento: '',
    contrasenia: '',
    confirmarContrasena: '',
    correo:'',
    id_fraccionamiento:'',
  };
  invitacion: Invitacion[] = [];

  constructor(private route: ActivatedRoute,private invitacionService: InvitacionService, private correoService: CorreoService,private fb: FormBuilder) {
    this.UserGroup = this.fb.group({
      nombre: ['', Validators.required],
      apellido_pat: ['', Validators.required],
      apellido_mat: ['', Validators.required],
      telefono: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      contrasenia: ['', Validators.required],
      confirmarContrasena: ['', Validators.required],
      correo: ['', Validators.required],
      id_fraccionamiento: ['', Validators.required],
      id_lote: ['', Validators.required],

      
    })
  }


  id_lote:number=6; // esta variable es la que envia para registrar la invitacion
  id_loteParaMostrar:number=0; //esta variable es la que recibe el valor de la consulta
  nomber_fraccionamiento:string='cracatoa'
  nombre_admin:string='chayo fierro';
  generarInvitacion(correoElectronico: string, idFraccionamiento: number): void {
    const token = uuidv4();
    this.invitacionService.generarInvitacion(token,correoElectronico, idFraccionamiento,this.id_lote,this.nomber_fraccionamiento,this.nombre_admin)
      .subscribe(
        response => {
          console.log('Invitacion generada correctamente:',correoElectronico, response);
          Swal.fire({
            title: 'Invitacion generada correctamente',
            text: '',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
          this.enviarCorreo(correoElectronico,"http://localhost:4200/Invitacion?token="+token);
        },
        error => {
          Swal.fire({
            title: 'Error al generar la invitación',
            text: '',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })
          console.error('Error al generar la invitación:', error);
          
        }
      );
  }
  
  ngOnInit(): void {
    this.obtenerDatosInvitacion();
    //this.generarInvitacion("fierro_ross@live.com.mx",15);
  }

  obtenerDatosInvitacion(){
    this.route.queryParams.subscribe(params => {
      const token = params['token']; // Obtiene el token de la URL
      if (token) {
        this.invitacionService.obtenerDatosInvitacion(token).subscribe(
          (response: Invitacion[]) => {
            if (response.length > 0) { // Verifica si se obtuvieron datos
              this.invitacion = response;
              console.log(this.invitacion);
              this.UserGroup.patchValue({correo: this.invitacion[0].correo_electronico});
              this.UserGroup.patchValue({id_fraccionamiento: 'ID del fraccionamiento: '+this.invitacion[0].id_fraccionamiento});
              this.UserGroup.patchValue({id_lote: 'ID del lote: '+this.invitacion[0].lote});
              
              
            } else {
              console.log(this.invitacion);
              // Manejar el caso cuando no se encuentran datos con el token
            }
          },
          error => {
            console.log(error);
            Swal.fire({
              title: 'Error en la invitacion',
              text: 'Error al consultar los datos de la invitacion. Contacte a su administrador',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            })
          }
        );
      }
    });
    
    
  }


  enviarCorreo(correoDestinatario: string, mensaje: string): void {
    this.correoService.Enviar_Correo(correoDestinatario, mensaje);
  }

  agregar_usuario(usuario: Usuario){
    console.log(usuario);
    
  }
}
