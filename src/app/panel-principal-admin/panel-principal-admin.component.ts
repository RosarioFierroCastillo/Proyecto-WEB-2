import { Component } from '@angular/core';
import {ChangeDetectorRef, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout'
import { DataService } from '../data.service'
import { ImagenService } from './imagen.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-panel-principal-admin',
  templateUrl: './panel-principal-admin.component.html',
  styleUrls: ['./panel-principal-admin.component.css']
})
export class PanelPrincipalAdminComponent {
  imagen: any;


  mobileQuery: MediaQueryList;

  //fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
 
   
  fillerNav=[
    {name:"Home", route:"", icon:"home"},
    {name:"Acuerdos", route:"Acuerdos", icon:"assignment"},
    {name:"Notificaciones", route:"Notificaciones", icon:"priority_high"},
    {name:"Propiedades", route:"Propiedades", icon:"explore", 
    children: [
      {name:"Agregar", route:"Propiedades", icon:"assignment_ind"},
      {name:"Consultar", route:"ConsultarPropiedades", icon:"class"}
    ]},
    {name:"Controlador",route:"Fraccionamientos", icon:"cast_connected"},
    {name:'Usuarios',route:"Usuarios", icon:"supervised_user_circle", 
    children: [
      {name:"Agregar", route:"AgregarUsuario", icon:"person_add", 
      children: []},
      {name:"Consultar", route:"ConsultarUsuario", icon:"class"}
    ]},
    {name:"Configuracion",route:"Settings",icon:"settings"}
   //{name:'Salir',route:'Home', icon:"exit_to_app"}

   // <font-awesome-icon icon="right-from-bracket" />
  ]


  exit() {
    //location.reload();
    this.router.navigate(['../']);
  }

 
  private _mobileQueryListener: () => void;
Nav: any;
usuario: any;

    

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private data: DataService, private imagenService: ImagenService,private router:Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
   
  }

 

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = true;

  ngOnInit(): void {
    this.usuario = this.data.obtener_usuario(2);
    this.Cargar_Imagen(this.data.obtener_usuario(1));
  }



  imagenURL: string = '';
  Cargar_Imagen(id_persona: number){
    this.imagenService.obtenerImagenPorId(id_persona).subscribe(
      (imagen: ArrayBuffer) => {
        if(imagen){
          this.createImageFromBlob(new Blob([imagen]));
        }else{
          this.imagenURL='assets/usuario.png';
        }
      },
      error => {
        console.error('Error al obtener la imagen', error);
        this.imagenURL='assets/usuario.png';
      }
    );
  }

  createImageFromBlob(image: Blob): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imagenURL = reader.result as string;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  //Configuracion del submenu para que no se abra dos veces
  submenuAbierto: number = -1;
  abrirSubmenu(index: number): void {
    if (this.submenuAbierto === index) {
      this.submenuAbierto = -1; // Si se hace clic en el mismo, ciérralo
    } else {
      this.submenuAbierto = index; // Abre el nuevo submenu
    }
  }

}
