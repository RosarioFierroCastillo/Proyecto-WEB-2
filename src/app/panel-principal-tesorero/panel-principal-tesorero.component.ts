import { Component } from '@angular/core';
import {ChangeDetectorRef, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout'
import { Router } from "@angular/router";

@Component({
  selector: 'app-panel-principal-tesorero',
  templateUrl: './panel-principal-tesorero.component.html',
  styleUrls: ['./panel-principal-tesorero.component.css']
})
export class PanelPrincipalTesoreroComponent {

  mobileQuery: MediaQueryList;

  //fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);


  fillerNav=[
    {name:"Deudas Ordinarias", route:"DeudasOrdinarias", icon:"border_color"},
    {name:"Deudas Extraordinarias", route:"DeudasExtraordinarias", icon:"border_color"},
    {name:"Deudores", route:"Deudores", icon:"report_problem"},
    {name:"Egresos", route:"Egresos", icon:"call_made"},
    {name:"Ingresos Extraordinarios",route:"IngresosExtraordinarios", icon:"call_received"},
    {name:'Ingresos ordinarios',route:"IngresosOrdinarios", icon:"archive"},
    {name:'Proveedores',route:"Proveedores", icon:"store_mall_directory", children: [
      {name:"Ingresos Extraordinarios",route:"IngresosExtraordinarios", icon:"call_received"}
    ]}
  ]

  exit() {
    //location.reload();
    this.router.navigate(['../']);
  }

  fillerContent = Array.from(
    {length: 50},
    () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  );

  private _mobileQueryListener: () => void;
Nav: any;
    

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private router:Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = true;

  ngOnInit(): void {
    
  }
}
