import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
import {  deudores, deudor } from "../modelos/deudas"
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-deudores',
  templateUrl: './deudores.component.html',
  styleUrls: ['./deudores.component.css']
})
export class DeudoresComponent {
  httpclient: any;
  deudores: deudores[] = [];
  deudor =new deudor();
  filtroDeudores:'' | undefined;


  ngOnInit(){
    this.fetchDataDeudores();
  }

  constructor(private http: HttpClient, private dataService: DataService, private fb: FormBuilder){}

  fetchDataDeudores() {
    this.dataService.fetchDataDeudores(this.dataService.obtener_usuario(3)).subscribe((deudores: deudores[]) => {
      console.log(deudores);
      this.deudores = deudores;
    });
  }

  restringir_acceso(id_deuda: any) {
    this.dataService.restringir_acceso(id_deuda).subscribe((deudores: deudores[]) => {
      console.log(deudores);
      this.deudores = deudores;
    }); 
  }

  delete(id_deuda:any){
    
  }

  
}
