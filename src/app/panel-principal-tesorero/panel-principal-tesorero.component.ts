import { Component } from '@angular/core';
import {ChangeDetectorRef, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout'
import { Router } from "@angular/router";
import { ImagenService } from '../panel-principal-admin/imagen.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-panel-principal-tesorero',
  templateUrl: './panel-principal-tesorero.component.html',
  styleUrls: ['./panel-principal-tesorero.component.css']
})
export class PanelPrincipalTesoreroComponent {
  usuario: any;

  mobileQuery: MediaQueryList;

  //fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);


  fillerNav=[
    {name:"Deudas", route:"", icon:"border_color",children:[
      {name:"Agregar Deudas", route:"Deudas", icon:"border_color"},
    {name:'Consultar Deudas', route:'ConsultarDeudas', icon:'border_color'},
    ]},
    {name:"Deudores", route:"Deudores", icon:"report_problem"},
    {name:"Egresos", route:"Egresos", icon:"call_made"},
    {name:"Ingresos Extraordinarios",route:"IngresosExtraordinarios", icon:"call_received"},
    {name:"Ingresos Ordinarios",route:"IngresosOrdinarios", icon:"call_received"},
    {name:'Proveedores',route:"Proveedores", icon:"store_mall_directory"},
    {name:'Configuracion',route:'Settings',icon:'settings'}
    
  ]

  exit() {
    //location.reload();
    this.router.navigate(['../']);
  }


  private _mobileQueryListener: () => void;
Nav: any;
    

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private router:Router,private imagenService: ImagenService, private data:DataService) {
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
