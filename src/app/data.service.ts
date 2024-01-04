import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { fraccionamientos, controladores } from '../app/modelos/fraccionamientos';
import { sesion, sesions, usuarios } from '../app/modelos/usuarios'
import {  deudas, deuda, deudores } from "../app/modelos/deudas"
import { lotes } from '../app/modelos/propiedades';
import { inquilinos } from '../app/modelos/inquilinos';
import {formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  sesion  = new sesion();
  baseUrl = `https://evaluacionesuas-001-site1.gtempurl.com/Fraccionamientos/Consultar_Fraccionamiento?id_administrador=`;
  baseUrl1 = `https://localhost:7274/api/Personas/Consultar_Persona?id_administrador=`;
  baseUrl2 = `https://localhost:7274/Propiedades/Consultar_Propiedades?id_administrador=`;
  date1: any;
  
  
  constructor(private http: HttpClient) {}

  fetchData(id_administrador: any): Observable<fraccionamientos[]> {
    return this.http.get<fraccionamientos[]>(this.baseUrl+id_administrador);
  }

  fetchDataHikvision(id_administrador: any): Observable<controladores[]> {
    return this.http.get<controladores[]>("https://localhost:7274/Hikvision/Consultar_Hikvision?id_fraccionamiento="+id_administrador);
  }

  fetchDataUsers(id_administrador: any): Observable<usuarios[]> {
    return this.http.get<usuarios[]>(this.baseUrl1+id_administrador);
  }

  fetchDataPropiedades(id_administrador: any): Observable<lotes[]> {
    return this.http.get<lotes[]>(this.baseUrl2+id_administrador);
  }

  fetchDataPersonasFraccionamiento(id_fraccionamiento: any, id_administrador: any): Observable<usuarios[]> {
    return this.http.get<usuarios[]>(
      'https://localhost:7274/api/Personas/Consultar_Personas_Fraccionamiento?id_fraccionamiento='+id_fraccionamiento+
      '&id_administrador='+id_administrador);
  }

  fetchDataPersonasLote(id_lote: any): Observable<inquilinos[]> {
    return this.http.get<inquilinos[]>('https://localhost:7274/api/Usuario_lote/Consultar_inquilino?id_lote='+id_lote);
  }

  fetchDataDeudas(id_tesorero: any): Observable<deudas[]> {
    return this.http.get<deudas[]>('https://localhost:7274/api/Deudas/Consultar_Deuda?id_tesorero='+id_tesorero);
  }

  fetchDataDeudasExtra(id_tesorero: any): Observable<deudas[]> {
    return this.http.get<deudas[]>('https://localhost:7274/api/Deudas/Consultar_DeudaExtra?id_tesorero='+id_tesorero);
  }

  fetchDataDeudores(id_fraccionamiento:number): Observable<deudores[]> {
    return this.http.get<deudores[]>('https://localhost:7274/api/Deudas_Usuario/Consultar_Deudores?id_fraccionamiento='+id_fraccionamiento);
  }

  restringir_acceso(id_deuda: any): Observable<deudores[]> {
    return this.http.get<deudores[]>('https://localhost:7274/api/Deudas_Usuario/Restringir_acceso?id_deuda='+id_deuda);
  }

  iniciar_sesion1(sesion: {username: string, password:string}):Observable<sesions[]>{
  let direccion = "https://localhost:7274/Sesion/Iniciar_Sesion?correo="+sesion.username+"&contrasenia="+sesion.password;
  return this.http.get<sesions[]>(direccion);
  //https://localhost:7274
  //https://evaluacionesuas-001-site1.gtempurl.com
  }

  fecha(date: Date){
    return formatDate(date, 'yyyy-MM-dd', 'en-US');
  } 

    obtener_usuario(op: number){
      var data = (JSON.parse(localStorage.getItem("data") || '{}'));
      if(op==1){
        return data.id_usuario;
      }
      else if(op==2){
        return data.correo;
      }else if(op==3){
        return data.id_fraccionamiento;
      }

    }

  

}

