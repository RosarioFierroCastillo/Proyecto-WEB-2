import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { DataService } from '../data.service';
import {  lote, lotes } from "../modelos/propiedades"
import {  inquilino, inquilinos } from "../modelos/inquilinos"
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { fraccionamiento, fraccionamientos } from "../modelos/fraccionamientos";
import { usuario, usuarios } from "../modelos/usuarios"

@Component({
  selector: 'app-consultar-propiedades',
  templateUrl: './consultar-propiedades.component.html',
  styleUrls: ['./consultar-propiedades.component.css']
})
export class ConsultarPropiedadesComponent {

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
}
 