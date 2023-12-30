import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { usuario, usuarios } from "../modelos/usuarios"
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { HttpClient, HttpHeaders } from '@angular/common/http';


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

    this.fetchDataUsers(this.dataService.obtener_usuario(1));
   // this.fetchData(this.dataService.obtener_usuario(1));
  }

  fetchDataUsers(id_administrador: any) {
    this.dataService.fetchDataUsers(id_administrador).subscribe((usuarios: usuarios[]) => {
      console.log("fetch", usuarios);
      this.usuarios = usuarios;
    });
  }

  
  constructor(private http: HttpClient, private dataService: DataService, private fb: FormBuilder) {

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
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagenSeleccionada = reader.result as string;
    };
    reader.readAsDataURL(input.files[0]);
  }
  input.value = ''; // Limpiar el input de tipo file
}


Cargar_Imagen(){
  const id_Pago = 3; //  ID correspondiente
  //esta llamada es la que tienes que cambiar para consultar la imagen
  this.imageService.obtenerImagenPorId(id_Pago).subscribe(
    (imagen: ArrayBuffer) => {
      this.createImageFromBlob(new Blob([imagen]));
    },
    error => {
      console.error('Error al obtener la imagen', error);
    }
  );
}

createImageFromBlob(image: Blob): void {
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    this.imagenSeleccionada = reader.result as string;
  }, false);

  if (image) {
    reader.readAsDataURL(image);
  }
}
}
