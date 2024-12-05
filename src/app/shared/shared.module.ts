import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalAccionComponent } from './components/modal-accion/modal-accion.component';
import { ModalCargaInicialComponent } from './components/modal-carga-inicial/modal-carga-inicial.component';
import { RouterModule } from '@angular/router';
import { ModalInfoComponent } from './components/modal-info/modal-info.component';
import { ModalConsultaComponent } from './components/modal-consulta/modal-consulta.component';



@NgModule({
  declarations: [
    ModalAccionComponent,
    ModalCargaInicialComponent,
    ModalInfoComponent,
    ModalConsultaComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ModalAccionComponent,
    ModalCargaInicialComponent,
    ModalInfoComponent,
    ModalConsultaComponent
  ]
})
export class SharedModule { }
