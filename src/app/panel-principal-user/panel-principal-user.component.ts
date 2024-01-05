import { Component } from '@angular/core';
import {ChangeDetectorRef, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { DataService } from '../data.service';
import { Router } from "@angular/router";
import { ImagenService } from '../panel-principal-admin/imagen.service';


@Component({
  selector: 'app-panel-principal-user',
  templateUrl: './panel-principal-user.component.html',
  styleUrls: ['./panel-principal-user.component.css']
})
export class PanelPrincipalUserComponent {
  mobileQuery: MediaQueryList;
  usuario: any;

  //fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);


  fillerNav=[
    {name:"Notificaciones", route:"Notificaciones_usuarios", icon:"assignment"},
    {name:"Mis Deudas", route:"MisDeudas", icon:"priority_high"},
    {name:"Proveedores", route:"Proveedores_usuarios", icon:"explore"},
    {name:"Acceso a puerta",route:"AccesoPuerta", icon:"dashboard"},
    {name:'Acuerdos',route:"Acuerdos_usuarios", icon:"supervised_user_circle"},
    {name:'Configuracion',route:"Settings", icon:"settings"},
    {name:'Administracion',route:"Administracion", icon:"supervised_user_circle", children: [
      {name:'Acuerdos',route:"Acuerdos_usuarios", icon:"supervised_user_circle"}
    ]},
   // {name:'Salir',route:"NotFound", icon:"fa-sign-out "}
  ]


exit() {
  //location.reload();
  this.router.navigate(['../']);
}

  

  private _mobileQueryListener: () => void;
Nav: any;
    

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private dataService: DataService,private router:Router, private imagenService:ImagenService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = true;

  ngOnInit(): void {
    this.usuario = this.dataService.obtener_usuario(2);
    this.Cargar_Imagen(this.dataService.obtener_usuario(1));
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
}
