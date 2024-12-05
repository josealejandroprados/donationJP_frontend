import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ModalAccionComponent } from 'src/app/shared/components/modal-accion/modal-accion.component';
import { ModalCargaInicialComponent } from 'src/app/shared/components/modal-carga-inicial/modal-carga-inicial.component';
import { ModalConsultaComponent } from 'src/app/shared/components/modal-consulta/modal-consulta.component';
import { DonationModel } from 'src/app/shared/models/donation.model';
import { ModalConsulta } from 'src/app/shared/models/modal-consulta.model';
import { ModalModel } from 'src/app/shared/models/modal.model';
import { DonationService } from 'src/app/shared/services/donation.service';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent implements OnInit, AfterViewInit{

  donations:DonationModel[]=[];
  currentUserRol!:string;
  idDonationSelected!:string;
  action!:string;

  // acceder al componente hijo para usar sus metodos
  @ViewChild(ModalCargaInicialComponent) modalInicial!:ModalCargaInicialComponent;

  // accedo al componente hijo modalAccion
  @ViewChild(ModalAccionComponent) modalAccion!:ModalAccionComponent;

  // accedo al componente hijo modalConsulta
  @ViewChild(ModalConsultaComponent) modalConsult!:ModalConsultaComponent;

  // modelo de modal para eliminar donacion
  modalDeleteDonation:ModalModel = {
    title:'Eliminar Donación',
    textoBodyModal: '',
    textoBtn: 'Aceptar',
    hab_btn: false
  }

  // modelo de modal de consulta de eliminacion de usuario
  modalQueryDeleteDonation:ModalConsulta = {
    title:'Eliminar Donación',
    textoBodyModal: '¿Está seguro que desea eliminar este registro?'
  }

  ngOnInit(): void {
    // obtengo el rol del usuario actual
    this.currentUserRol = localStorage.getItem('rol') || '';
  }

  constructor(
    private donation:DonationService
  ){}

  ngAfterViewInit(): void {
    // abrir modal de carga inicial
    this.modalInicial.abrirModal();

    // obtener donaciones
    this.getDonations();
  }

  private getDonations(){
    this.donations = [];

    this.donation.getDonations().subscribe(
      response => {
        if(response.message=='exito'){
          this.donations = response.donations;
        }
        else{
          console.log('error al obtener las donaciones')
        }
        this.modalInicial.cerrarModal();
      }
    );
  }

  deletePayment(id:string){
    // abro modal de consulta
    this.modalConsult.abrirModalConsulta();

    this.idDonationSelected = id;
    this.action='deleteDonation';
  }

  okConsult(){

    if(this.action==='deleteDonation'){
      // abrir modalAccion para eliminar donacion
      this.modalDeleteDonation.textoBodyModal = 'Eliminando registro...';
      this.modalAccion.abrirModal();

      // llamo al servicio
      this.donation.deletePayment(this.idDonationSelected).subscribe(
        response => {
          if(response.message=='exito'){
            this.modalDeleteDonation.textoBodyModal = 'Registro eliminado con éxito';
            this.modalDeleteDonation.hab_btn = true;
            this.getDonations();
          }
          else{
            this.modalDeleteDonation.textoBodyModal = 'Error al eliminar registro';
            this.modalDeleteDonation.hab_btn = true;
          }
        }
      );
    }
    // 
  }

  aceptar(){
    if(this.action==='deleteDonation'){
      // reinicio variables del modal
      this.modalDeleteDonation.textoBodyModal = '';
      this.modalDeleteDonation.hab_btn = false;
    }
    // 
  }
}
