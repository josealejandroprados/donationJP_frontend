import { AfterViewInit, Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalCargaInicialComponent } from 'src/app/shared/components/modal-carga-inicial/modal-carga-inicial.component';
import { DonationService } from 'src/app/shared/services/donation.service';
import Popover from 'bootstrap/js/dist/popover';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit{

  popoverInstance:Popover| null = null;

  formDonacion = new FormGroup({
    amount: new FormControl('', [Validators.required, Validators.min(1)])
  });

  @ViewChild(ModalCargaInicialComponent) modalInicial!:ModalCargaInicialComponent;

  ngOnInit(): void {
    this.formDonacion.statusChanges.subscribe( (status) => {
      if(status=='INVALID'){
        // agregar popover
        // console.log('formulario INVALIDO');
        this.agregarPopover();
      }
      else if(status=='VALID'){
        // quitar popover
        // console.log('form VALIDO');
        this.quitarPopover();
      }
    });
  }

  constructor(
    private _donacion:DonationService,
    private renderer:Renderer2
  ){}

  ngAfterViewInit(): void {
    // obtener referencia al boton
    const btnEnviar = document.getElementById('enviar');

    if(btnEnviar){
      this.popoverInstance = new Popover(btnEnviar, {
        trigger:'hover',
        container:'body',
        content: 'Por favor complete campo obligatorio',
        placement: 'top'
      });
    }

    // accedo al input amount por su id
    const input_amount = document.getElementById('amount');
    if(input_amount){
      // le aplico el focus al input
      this.renderer.selectRootElement(input_amount).focus();
    }
  }

  enviarDonacion(){
    if(this.formDonacion.valid){

      // abrir modal
      this.modalInicial.abrirModal();

      // console.log(this.formDonacion.value);

      // llamo al servicio
      this._donacion.createDonation(this.formDonacion.value).subscribe(
        response => {
          if(response.message=='exito'){
            // redirigir a la pagina de mercadopago que viene en response
            window.location.href=response.init_point;
          }
          else{
            console.log(response.message);
            this.modalInicial.cerrarModal();
          }
        }
      );
    }
  }

  private agregarPopover() {
    if (this.popoverInstance) {
      // habilitar el popover
      this.popoverInstance.enable();
      this.popoverInstance.show(); // Mostrar el popover
    }
  }

  private quitarPopover() {
    if (this.popoverInstance) {
      // deshabilitar popover
      this.popoverInstance.disable();
    }
  }

  get amount(){
    return this.formDonacion.get('amount') as FormControl;
  }
}
