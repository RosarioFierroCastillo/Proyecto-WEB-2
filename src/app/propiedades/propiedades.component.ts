import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { DataService } from '../data.service';
import {  lote, lotes } from "../modelos/propiedades"
import {  inquilino, inquilinos } from "../modelos/inquilinos"
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { fraccionamiento, fraccionamientos } from "../modelos/fraccionamientos";
import { usuario, usuarios } from "../modelos/usuarios"
import { inquilinoss } from "../inquilinos/inquilinos.component"
import { Observable } from 'rxjs';





@Component({
  selector: 'app-propiedades',
  templateUrl: './propiedades.component.html',
  styleUrls: ['./propiedades.component.css']
})
export class PropiedadesComponent {


  httpclient: any;
  UserGroup: FormGroup;
  UserGroup1: FormGroup;
  lotes: lotes[] = [];
  lote =new lote();
  inquilinos: inquilinos[] = [];
  inquilino =new inquilino();
  AbrirMenu: boolean = false; 
  fraccionamientos: fraccionamientos[] = [];
  usuarios: usuarios[] = [];
  id_lote: any;
  id_renta: any;
  id_fraccionamiento: any;
  id_usuario_lote: any;

  onSelect(id_fraccionamiento: any) {
    console.log(id_fraccionamiento);
   // this.id_fraccionamiento = id_fraccionamiento;
    this.fetchDataPersonasFraccionamiento(id_fraccionamiento, this.dataService.obtener_usuario(1))
   // this.ubigeo.getProvincias(code); // con esto ya hemos obtenido las provincias del departamento seleccionado, ahora solo falta ponerlo en la plantilla html.
 }


  onRowClicked(lote: any) {
    this.id_lote= lote['id_lote']
    this.id_renta = lote['id_renta']
    this.id_fraccionamiento= lote['id_fraccionamiento']
    console.log(this.id_lote)

  }

  onRowClicked1(inquilino: any){
    this.id_usuario_lote = inquilino['id_usuario_lote']
  }

  CerrarMenu(){
    this.AbrirMenu = false;
  }

  AbrirrMenu(lote: any){
    this.fetchDataPersonasFraccionamiento(lote.id_fraccionamiento, this.dataService.obtener_usuario(1))
    this.fetchDataPersonasLote(lote.id_lote);
    console.log("lote: ", lote.id_lote)
    this.AbrirMenu = true;
  }

  ngOnInit(){
    this.fetchDataUsers(this.dataService.obtener_usuario(1));
    this.fetchData(this.dataService.obtener_usuario(1));
    this.fetchDataPropiedades(this.dataService.obtener_usuario(1));
    this.fetchDataPersonasFraccionamiento(0,0)
  }
  
constructor(private http: HttpClient, private dataService: DataService, private fb: FormBuilder, private fb1: FormBuilder){

this.UserGroup = this.fb.group({
  //   id_fraccionamiento: ['16', Validators.required],
     id_lote: ['', Validators.required],
     id_fraccionamiento: [' ', Validators.required],
     descripcion: ['', Validators.required],
     tipo: ['', Validators.required],
     direccion: ['', Validators.required],
     id_propietario: ['', Validators.required],
     id_renta: ['', Validators.required]


   })



this.UserGroup1 = this.fb1.group({
  //   id_fraccionamiento: ['16', Validators.required],
     id_usuario: ['', Validators.required],
     nombre: ['', Validators.required],
     codigo_acceso: ['', Validators.required],
     intercomunicador: ['', Validators.required],
    
   })
}


nombre_inquilino : any

obtener_etiqueta(event: any) {
  this.nombre_inquilino = event.target.selectedOptions[0].text
}

agregar_inquilino(inquilino: {

  id_usuario: any;
  id_lote: any;
  id_renta: any;
  id_fraccionamiento: any;
  codigo_acceso: any;
  intercomunicador: any; 
  nombre: any;
}) {


    const params = {

      id_usuario: inquilino.id_usuario,
      id_lote: this.id_lote,
      id_renta: this.id_renta,
      id_fraccionamiento: this.id_fraccionamiento,
      codigo_acceso: "123",
      intercomunicador: "123",
      nombre: this.nombre_inquilino

    };

    console.log("params: ",params)

    let direccion = "https://localhost:44397/api/Usuario_lote/Agregar_inquilino";

    const headers = new HttpHeaders({ 'myHeader': 'procademy' });
    this.http.post(
      direccion,
      params, { headers: headers })
      .subscribe((res) => {
        console.log(res);
      //  this.inquilinos.push(this.UserGroup1.value);
      //this.inquilinos.push(params.nombre.value);
        this.fetchDataPersonasLote(this.id_lote);
        this.UserGroup1.reset();
      });

  }















fetchData(id_administrador: any) {
  this.dataService.fetchData(id_administrador).subscribe((fraccionamientos: fraccionamientos[]) => {
    console.log(fraccionamientos);
    this.fraccionamientos = fraccionamientos;
  });
}

fetchDataUsers(id_administrador: any) {
  this.dataService.fetchDataUsers(id_administrador).subscribe((usuarios: usuarios[]) => {
    console.log("fetch", usuarios);
    this.usuarios = usuarios;
  });
}

fetchDataPropiedades(id_administrador: any){
  this.dataService.fetchDataPropiedades(id_administrador).subscribe((lotes: lotes[]) => {
    console.log("usuarios:",lotes);
    this.lotes = lotes;
  });
}
//Busca personas por fraccionamiento
fetchDataPersonasFraccionamiento(id_fraccionamiento: any, id_administrador: any){
  this.dataService.fetchDataPersonasFraccionamiento(id_fraccionamiento,id_administrador).subscribe((usuarios: usuarios[]) => {
    console.log("usuarios:", usuarios);
    this.usuarios = usuarios;
  });
}

fetchDataPersonasLote(lote: any){
  this.dataService.fetchDataPersonasLote(lote).subscribe((inquilinos: inquilinos[]) => {
  //  console.log("usuarios:", usuarios);
    this.inquilinos = inquilinos;
  });
}

edit(lotes: {
  descripcion: any; 
  tipo: any;
  direccion: any;
  id_propietario: any;
  id_renta: any;
  id_fraccionamiento: any;
}){
  this.lote.id_fraccionamiento = lotes.id_fraccionamiento,
  this.lote.descripcion = lotes.descripcion,
  this.lote.tipo = lotes.tipo
  this.lote.direccion = lotes.direccion,
  this.lote.id_renta = lotes.id_renta,
  this.lote.id_propietario = lotes.id_propietario
}

agregar_lote(lote: {

  id_lote: any;
  id_fraccionamiento: any;
  descripcion: any;
  tipo: any;
  direccion: any;
  id_propietario: any;
  id_renta: any;
  id_administrador: any; 
}) {

    //console.log("propietario: ",lote.id_propietario)
    const params = {
      id_lote: 0,
      id_fraccionamiento: Number(lote.id_fraccionamiento),
      descripcion: lote.descripcion,
      tipo: lote.tipo,
      direccion: lote.direccion,
      id_propietario: Number(lote.id_propietario),
      id_administrador: this.dataService.obtener_usuario(1),
      id_renta: lote.id_renta
    };

    console.log("params: ",params)

    let direccion = "https://localhost:44397/Propiedades/Agregar_Propiedad";

    const headers = new HttpHeaders({ 'myHeader': 'procademy' });
    this.http.post(
      direccion,
      params, { headers: headers })
      .subscribe((res) => {
        console.log(res);
        this.lotes.push(this.UserGroup.value);
        this.UserGroup.reset();
      });

  }


  delete(id_lote: any){
    return this.http.delete("https://localhost:44397/Propiedades/Eliminar_Propiedad?id_lote="+id_lote).subscribe(
      () => {
        this.fetchDataPropiedades(this.dataService.obtener_usuario(1))
        console.log("hola");

   
      })
  }


delete_user(id_usuario_lote: any){
    return this.http.delete("https://localhost:44397/api/Usuario_lote/Eliminar_inquilino?id_lote="+id_usuario_lote).subscribe(
      () => {
        console.log("eliminado", this.id_lote)
        this.fetchDataPersonasLote(this.id_lote);
   
      })


}
  
  actualizar_lote(
    lotes: {
    descripcion: any; 
    tipo: any;
    direccion: any;
    id_propietario: any;
    id_renta: any;
    id_fraccionamiento: any;
    id_lote: any;
    }
  ){
   
    const params = {
      id_fraccionamiento: lotes.id_fraccionamiento,
      descripcion: lotes.descripcion,
      tipo: lotes.tipo,
      direccion: lotes.direccion,
      id_renta: lotes.id_renta,
      id_propietario: lotes.id_propietario,
      id_lote: this.id_lote
      };

    const httpOptions = {
      headers: new HttpHeaders({
       'Content-Type':  'application/json'
      })
    }; 

    console.log("actualizar: ",params)

    return this.http.put("https://localhost:44397/Propiedades/Actualizar_Propiedad", params).subscribe(
      (_response) => {
        console.log("actualiza",params)
        this.ngOnInit();
        this.UserGroup.reset();

      }
    )

  }

}



