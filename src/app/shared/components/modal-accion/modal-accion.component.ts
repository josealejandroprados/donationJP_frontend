import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalModel } from '../../models/modal.model';

declare var window:any;

@Component({
  selector: 'app-modal-accion',
  templateUrl: './modal-accion.component.html',
  styleUrls: ['./modal-accion.component.css']
})
export class ModalAccionComponent implements OnInit{

  @Input() modalAccion!:ModalModel;
  @Output() complete = new EventEmitter<void>();

  varModal:any;
  
  ngOnInit(): void {
    this.varModal = new window.bootstrap.Modal(
      document.getElementById('modal-accion')
    );
  }

  public abrirModal(){
    // abrir modal
    this.varModal.show();
  }

  aceptar(){
    // cerrar modal
    this.varModal.hide();

    this.complete.emit();
  }
  
}
