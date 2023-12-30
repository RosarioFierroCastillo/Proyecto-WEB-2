import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FraccionamientosComponent } from './fraccionamientos/fraccionamientos.component';
import { AcuerdosComponent } from './acuerdos/acuerdos.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { PropiedadesComponent } from './propiedades/propiedades.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PanelPrincipalAdminComponent } from './panel-principal-admin/panel-principal-admin.component';
import { DeudasOrdinariasComponent } from './deudas-ordinarias/deudas-ordinarias.component';
import { DeudoresComponent } from './deudores/deudores.component';
import { EgresosComponent } from './egresos/egresos.component';
import { IngresosExtraordinariosComponent } from './ingresos-extraordinarios/ingresos-extraordinarios.component';
import { IngresosOrdinariosComponent } from './ingresos-ordinarios/ingresos-ordinarios.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { PanelPrincipalTesoreroComponent } from './panel-principal-tesorero/panel-principal-tesorero.component';
import { PanelPrincipalUserComponent } from './panel-principal-user/panel-principal-user.component';
import { DeudasExtraordinariasComponent } from './deudas-extraordinarias/deudas-extraordinarias.component';
import { NotificacionesUsuariosComponent } from './notificaciones-usuarios/notificaciones-usuarios.component';
import { ProveedoresUsuariosComponent } from './proveedores-usuarios/proveedores-usuarios.component';
import { AccesoPuertaComponent } from './acceso-puerta/acceso-puerta.component';
import { AcuerdosUsuariosComponent } from './acuerdos-usuarios/acuerdos-usuarios.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { MisDeudasComponent } from './mis-deudas/mis-deudas.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuario.component';
import { RegistrosComponent } from './registros/registros.component';
import { AppComponent } from './app.component';
import { EmailComponent } from './email/email.component';
import {ConsultarPropiedadesComponent} from './consultar-propiedades/consultar-propiedades.component'
import {CuentaComponent} from './cuenta/cuenta.component'

import { InvitacionComponent } from './invitacion/invitacion.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';


const routes: Routes = [
 // {path:'', component:HomeComponent},
  {path:'Acuerdos', component:AcuerdosComponent},
  {path:'Notificaciones', component:NotificacionesComponent},
  {path:'Propiedades', component:PropiedadesComponent},
  {path:'Fraccionamientos',component:FraccionamientosComponent},
  {path:'Usuarios', component:UsuariosComponent},
  {path:'Agregar_Usuario', component:AgregarUsuarioComponent},
  {path:'Registros', component:RegistrosComponent},

  

  {path:'Notificaciones_usuarios', component:NotificacionesUsuariosComponent},
  {path:'MisDeudas', component:MisDeudasComponent},
  {path:'Proveedores_usuarios', component:ProveedoresUsuariosComponent},
  {path:'AccesoPuerta', component:AccesoPuertaComponent},
  {path:'Acuerdos_usuarios', component:AcuerdosUsuariosComponent},
  {path:'Administracion', component:AdministracionComponent},

  
  {path:'PanelUser', component:PanelPrincipalUserComponent},
  {path:'NotFound', component:NotFoundComponent},
  {path:'AgregarUsuario', component:AgregarUsuarioComponent},
  {path:'Home', component:HomeComponent},
  {path:'ConsultarUsuario', component:EmailComponent},
  {path:'ConsultarPropiedades', component:ConsultarPropiedadesComponent},
  {path:'Settings', component:CuentaComponent},
  
  {path:'Invitacion', component:InvitacionComponent},


 
  //Inicio panel admin
  {path:'PanelAdmin', component:PanelPrincipalAdminComponent, 
  children: [
    {path:'Acuerdos', component:AcuerdosComponent},
    {path:'Notificaciones', component:NotificacionesComponent},
    {path:'Propiedades', component:PropiedadesComponent, 
    children: [
      {path:'Propiedades', component:PropiedadesComponent},
      {path:'ConsultarPropiedades', component:ConsultarPropiedadesComponent}
    ]},
    {path:'Fraccionamientos',component:FraccionamientosComponent},
    {path:'Usuarios', component:UsuariosComponent, 
    children: [
      {path:'ConsultarUsuario', component:EmailComponent},
      {path:'AgregarUsuario', component:AgregarUsuarioComponent}
    ]},
    {path:"Settings", component:CuentaComponent}
  ]},//Final panel admin

  //inicio panel tesorero
  {path:'PanelTesorero', component:PanelPrincipalTesoreroComponent,
  children:[
    {path:'DeudasOrdinarias', component:DeudasOrdinariasComponent},
  {path:'DeudasExtraordinarias', component:DeudasExtraordinariasComponent},
  {path:'Deudores', component:DeudoresComponent},
  {path:'Egresos', component:EgresosComponent},
  {path:'IngresosExtraordinarios', component:IngresosExtraordinariosComponent},
  {path:'IngresosOrdinarios', component:IngresosOrdinariosComponent},
  {path:'Proveedores', component:ProveedoresComponent},
  ]},//Final panel tesorero

  {path:'', component:InicioSesionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
