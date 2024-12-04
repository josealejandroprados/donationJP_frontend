import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ModalCargaInicialComponent } from 'src/app/shared/components/modal-carga-inicial/modal-carga-inicial.component';
import { DonationModel } from 'src/app/shared/models/donation.model';
import { DonationService } from 'src/app/shared/services/donation.service';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent implements OnInit, AfterViewInit{

  donations:DonationModel[]=[];

  // acceder al componente hijo para usar sus metodos
  @ViewChild(ModalCargaInicialComponent) modalInicial!:ModalCargaInicialComponent;

  ngOnInit(): void {
    // 
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
          console.log(this.donations);
        }
        else{
          console.log('error al obtener las donaciones')
        }
        this.modalInicial.cerrarModal();
      }
    );
  }

  deletePayment(id:string){
    // llamo al servicio
    this.donation.deletePayment(id).subscribe(
      response => {
        if(response.message=='exito'){
          alert('registro de donacion eliminado con exito');
          this.getDonations();
        }
        else{
          alert('error al eliminar donacion')
        }
      }
    );
  }
}
