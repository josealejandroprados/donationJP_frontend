import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalAccionComponent } from './components/modal-accion/modal-accion.component';
import { ModalCargaInicialComponent } from './components/modal-carga-inicial/modal-carga-inicial.component';
import { RouterModule } from '@angular/router';
import { ModalInfoComponent } from './components/modal-info/modal-info.component';



@NgModule({
  declarations: [
    ModalAccionComponent,
    ModalCargaInicialComponent,
    ModalInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ModalAccionComponent,
    ModalCargaInicialComponent,
    ModalInfoComponent
  ]
})
export class SharedModule { }
