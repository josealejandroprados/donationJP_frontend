import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalAccionComponent } from './components/modal-accion/modal-accion.component';
import { ModalCargaInicialComponent } from './components/modal-carga-inicial/modal-carga-inicial.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ModalAccionComponent,
    ModalCargaInicialComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ModalAccionComponent,
    ModalCargaInicialComponent
  ]
})
export class SharedModule { }
