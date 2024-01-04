import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { usuario, usuarios } from "../modelos/usuarios"
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from './usuario.model';
import { ImageService } from './image.service';


@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent {
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
  //usuario = new usuario();
  usuarios: usuarios[] = [];
  UserGroup: FormGroup;

  ngOnInit(): void {

    //this.fetchDataUsers(this.dataService.obtener_usuario(1));
   // this.fetchData(this.dataService.obtener_usuario(1));
  }

  fetchDataUsers(id_administrador: any) {
    this.dataService.fetchDataUsers(id_administrador).subscribe((usuarios: usuarios[]) => {
      console.log("fetch", usuarios);
      this.usuarios = usuarios;
    });
  }

  
  constructor(private http: HttpClient, private dataService: DataService, private fb: FormBuilder, private imageService: ImageService) {

    this.UserGroup = this.fb.group({
      id_persona: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido_pat: ['', Validators.required],
      apellido_mat: ['', Validators.required],
      tipo_usuario: ['', Validators.required],
      id_lote: ['', Validators.required],
      telefono: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      correo: ['', Validators.required],
      contrasenia: ['', Validators.required],
      confirmarContrasena: ['', Validators.required],
      id_fraccionamiento: ['', Validators.required],

    })
  }




  
  actualizar_usuario(
    usuarios: {
      id_persona: string,
      nombre: string,
      apellido_pat: string,
      apellido_mat: string,
      tipo_usuario: string,
      telefono: any,
      fecha_nacimiento: any,
      intercomunicador: any,
      codigo_Acceso: any,
      id_fraccionamiento: number,
      correo: any,
      contrasenia: any
    }
  ) {

    const params = {
      id_persona: this.dataService.obtener_usuario(1),
      nombre: usuarios.nombre,
      apellido_pat: usuarios.apellido_pat,
      apellido_mat: usuarios.apellido_mat,
      telefono: usuarios.telefono,
      id_fraccionamiento: this.dataService.obtener_usuario(1),
      tipo_usuario: "administrador",
      intercomunicador: "123",
      codigo_acceso: "123",
      fecha_nacimiento: usuarios.fecha_nacimiento,
      correo: "urquidy12@gmail.com",
      contrasenia: usuarios.contrasenia,
      id_lote: 1
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    console.log("params  ", params);



    return this.http.put("https://localhost:44397/api/Personas/Actualizar_Persona", params).subscribe(
      (_response) => {
        console.log("hola");
        console.log("https://localhost:44397/api/Personas/Actualizar_Persona", params);
        
    
        this.ngOnInit();

      }
    )
  }


  //Seleccionado y generacion del arreglo de bytes de la imagen
  imagenSeleccionada: any; // Variable para mostrar la imagen seleccionada en la interfaz
  archivoSeleccionado: File | null = null;
  imagenEnBytes: Uint8Array | null = null;
  

  handleInputFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagenSeleccionada = reader.result as string;
          this.archivoSeleccionado = file; // Guardar el archivo seleccionado
  
          this.uploadFileToService(); // Llamar al método para subir el archivo al servicio
        };
        reader.readAsDataURL(file);
      }
    }
    input.value = ''; // Limpiar el input de tipo file
  }
  
  
  
  uploadFileToService(): void {
    if (this.archivoSeleccionado) { // Verificar si archivoSeleccionado no es null
      this.imageService.PostFile(this.dataService.obtener_usuario(1), this.archivoSeleccionado)
        .subscribe((response: any) => {
          // Manejar la respuesta del servicio si es necesario
          console.log('Archivo cargado con éxito');
        }, error => {
          // Manejar errores si la carga falla
          console.error('Error al cargar el archivo', error);
        });
    }
    }
  
  


//menu cambio de contrasenia
showPopupForm = false;

mostrarFormulario(): void {
  this.showPopupForm = true;
}

ocultarFormulario(): void {
  this.showPopupForm = false;
}

}
