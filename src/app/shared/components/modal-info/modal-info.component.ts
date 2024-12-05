import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalInfoModel } from '../../models/modal-info.model';

declare var window:any;

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.css']
})
export class ModalInfoComponent implements OnInit{

  @Input() modalInfo!:ModalInfoModel;
  @Output() complete = new EventEmitter<void>();

  varModal:any;

  ngOnInit(): void {
    this.varModal = new window.bootstrap.Modal(
      document.getElementById('modal-info')
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
