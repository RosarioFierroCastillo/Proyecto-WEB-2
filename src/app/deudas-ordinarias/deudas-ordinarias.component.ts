import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
import {  deudas, deuda } from "../modelos/deudas"
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { DatePipe } from '@angular/common'
 
@Component({
  selector: 'app-deudas-ordinarias',
  templateUrl: './deudas-ordinarias.component.html',
  styleUrls: ['./deudas-ordinarias.component.css']
})
export class DeudasOrdinariasComponent {
  tipo_formulario: string='';
  httpclient: any;
  UserGroup: FormGroup;
  deudas: deudas[] = [];
  deuda =new deuda();
  id_deudas: any;

  constructor(private http: HttpClient, private dataService: DataService, private fb: FormBuilder){


    this.UserGroup = this.fb.group({
         fraccionamiento: ['', Validators.required],
         monto: ['', Validators.required],
         nombre: ['', Validators.required],
         descripcion: ['', Validators.required],
         dias_gracia: ['', Validators.required],
         periodicidad: ['', Validators.required],
         recargo: ['', Validators.required],
    
       })

    }

    ngOnInit(): void {
  
      this.fetchDataDeudas(this.dataService.obtener_usuario(1));
    
    }

    onRowClicked(lote: any) {
      this.id_deudas= lote['id_deudas']
  
    }

    fetchDataDeudas(id_tesorero: any) {
      this.dataService.fetchDataDeudas(id_tesorero).subscribe((deudas: deudas[]) => {
        //console.log(deudas);
        this.deudas = deudas;
      });
    } 

    edit(deudas: {
      id_deudas: any;
      monto: any;
      nombre: any;
      descripcion: any;
      dias_gracia: any; 
      periodicidad: any;
      recargo: any;
      proximo_pago: any;
    }){
      this.deuda.id_deudas = deudas.id_deudas;
      this.deuda.monto= deudas.monto;
      this.deuda.nombre= deudas.nombre;
      this.deuda.descripcion= deudas.descripcion;
      this.deuda.dias_gracia= deudas.dias_gracia;
      this.deuda.periodicidad= deudas.periodicidad;
      this.deuda.recargo= deudas.recargo;
      this.deuda.proximo_pago= deudas.proximo_pago;
    }
    
agregar_deuda(deudas: {monto: number, nombre: string, descripcion: string, dias_gracia:number, periodicidad: number, recargo: number, id_tesorero: number, id_fraccionamiento:number}){
  console.log(deudas);
  deudas.id_tesorero = this.dataService.obtener_usuario(1);
  deudas.id_fraccionamiento= this.dataService.obtener_usuario(3);
  const headers = new HttpHeaders({'myHeader': 'procademy'});
  this.http.post(
   "https://localhost:7274/api/Deudas/Agregar_Deuda",
    deudas, {headers: headers})
    .subscribe((res) => { 
      console.log(res);
    //  this.ngOnInit(); 
    this.fetchDataDeudas(this.dataService.obtener_usuario(1));
    this.UserGroup.reset();
    });
 
}



  
actualizar_deuda(
  deudas: {monto: number, nombre: string, descripcion: string, dias_gracia:number, periodicidad: number, recargo: number, id_deudas: number}
){
 
  const params = {
    monto: deudas.monto,
    nombre: deudas.nombre,
    descripcion: deudas.descripcion,
    dias_gracia: deudas.dias_gracia,
    periodicidad: deudas.periodicidad,
    recargo: deudas.recargo,
    id_deudas:  this.id_deudas
    };

    console.log("deudas: ",deudas)

  const httpOptions = {
    headers: new HttpHeaders({
     'Content-Type':  'application/json'
    })
  }; 

  console.log("actualizar: ",params)

  return this.http.put("https://localhost:7274/api/Deudas/Actualizar_Deuda", params).subscribe(
    (_response) => {
      console.log("actualiza",params)
      this.ngOnInit();
      this.UserGroup.reset();

    }
  )

}


delete(id_deudas: any){
  return this.http.delete("https://localhost:7274/api/Deudas/Eliminar_Deuda?id_deudas="+id_deudas).subscribe(
    () => {
      this.fetchDataDeudas(this.dataService.obtener_usuario(1));
 
    })

}

/* A PARTIR DE AQUI EMPIEZA LO DE LAS DEUDAS EXTRAORDINARIAS*/
/* A PARTIR DE AQUI EMPIEZA LO DE LAS DEUDAS EXTRAORDINARIAS*/
/* A PARTIR DE AQUI EMPIEZA LO DE LAS DEUDAS EXTRAORDINARIAS*/

agregar_deudaExtra(deudas: {monto: number, nombre: string, descripcion: string, id_tesorero: number, proximo_pago: Date}){
  console.log(deudas);
  deudas.id_tesorero = this.dataService.obtener_usuario(1);
  console.log(deudas.id_tesorero);
  const headers = new HttpHeaders({'myHeader': 'procademy'});
  this.http.post(
   "https://localhost:7274/api/Deudas/Agregar_DeudaExtra",
    deudas, {headers: headers})
    .subscribe((res) => { 
      console.log(res);
    //  this.ngOnInit(); 
    this.fetchDataDeudasExtra(this.dataService.obtener_usuario(1));
    this.UserGroup.reset();
    });
 
}

fetchDataDeudasExtra(id_tesorero: any) {
  this.dataService.fetchDataDeudasExtra(id_tesorero).subscribe((deudas: deudas[]) => {
    console.log(deudas);
    this.deudas = deudas;
  });
} 

actualizar_deudaExtra(
  deudas: {monto: number, nombre: string, descripcion: string, proximo_pago: Date, id_deudas: number}
){
 
  const params = {
    monto: deudas.monto,
    nombre: deudas.nombre,
    descripcion: deudas.descripcion,
    id_deudas:  this.id_deudas,
    proximo_pago: deudas.proximo_pago
    };

    console.log("deudas: ",deudas)

  const httpOptions = {
    headers: new HttpHeaders({
     'Content-Type':  'application/json'
    })
  }; 

  console.log("actualizar: ",params)

  return this.http.put("https://localhost:7274/api/Deudas/Actualizar_Deuda", params).subscribe(
    (_response) => {
      console.log("actualiza",params)
      this.ngOnInit();
      this.UserGroup.reset();

    }
  )

}

}


