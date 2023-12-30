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
        console.log(deudas);
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
    
agregar_deuda(deudas: {monto: number, nombre: string, descripcion: string, dias_gracia:number, periodicidad: number, recargo: number, id_tesorero: number}){
  console.log(deudas);
  deudas.id_tesorero = this.dataService.obtener_usuario(1)
  const headers = new HttpHeaders({'myHeader': 'procademy'});
  this.http.post(
   "https://localhost:44397/api/Deudas/Agregar_Deuda",
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

  return this.http.put("https://localhost:44397/api/Deudas/Actualizar_Deuda", params).subscribe(
    (_response) => {
      console.log("actualiza",params)
      this.ngOnInit();
      this.UserGroup.reset();

    }
  )

}


delete(id_deudas: any){
  return this.http.delete("https://localhost:44397/api/Deudas/Eliminar_Deuda?id_deudas="+id_deudas).subscribe(
    () => {
      this.fetchDataDeudas(this.dataService.obtener_usuario(1));
 
    })

}
}


