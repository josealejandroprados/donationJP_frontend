import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseSitioRoutingModule } from './base-sitio-routing.module';
import { BaseComponent } from './components/base/base.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuNavComponent } from './components/menu-nav/menu-nav.component';


@NgModule({
  declarations: [
    BaseComponent,
    FooterComponent,
    MenuNavComponent
  ],
  imports: [
    CommonModule,
    BaseSitioRoutingModule
  ]
})
export class BaseSitioModule { }
