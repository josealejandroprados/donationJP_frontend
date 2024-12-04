import { Component, OnInit } from '@angular/core';

declare var window:any;

@Component({
  selector: 'app-modal-carga-inicial',
  templateUrl: './modal-carga-inicial.component.html',
  styleUrls: ['./modal-carga-inicial.component.css']
})
export class ModalCargaInicialComponent implements OnInit{

  varModal:any;

  ngOnInit(): void {
    this.varModal = new window.bootstrap.Modal(
      document.getElementById('menu-carga-inicial')
    );
  }

  public abrirModal(){
    // abrir modal
    // console.log('abriendo modal');
    this.varModal.show();
  }

  public cerrarModal(){
    // console.log('cerrando modal');
    this.varModal.hide();
  }
  
}
