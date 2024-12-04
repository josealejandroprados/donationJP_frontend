import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPrincipalRoutingModule } from './admin-principal-routing.module';
import { PrincipalComponent } from './components/principal/principal.component';
import { NavLateralComponent } from './components/nav-lateral/nav-lateral.component';


@NgModule({
  declarations: [
    PrincipalComponent,
    NavLateralComponent
  ],
  imports: [
    CommonModule,
    AdminPrincipalRoutingModule
  ]
})
export class AdminPrincipalModule { }
