import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ModalAccionComponent } from 'src/app/shared/components/modal-accion/modal-accion.component';
import { ModalCargaInicialComponent } from 'src/app/shared/components/modal-carga-inicial/modal-carga-inicial.component';
import { ModalModel } from 'src/app/shared/models/modal.model';
import { UserModel } from 'src/app/shared/models/users.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit{

  users:UserModel[] = [];

  // acceder al componente hijo para usar sus metodos
  @ViewChild(ModalCargaInicialComponent) modalInicial!:ModalCargaInicialComponent;

  // accedo al componente hijo
  @ViewChild(ModalAccionComponent) modalAccion!:ModalAccionComponent;

  modalDeleteUser:ModalModel = {
    title:'Eliminar Usuario',
    textoBodyModal: '',
    textoBtn: 'Aceptar',
    hab_btn: false
  }

  ngOnInit(): void {
    // 
  }

  constructor(
    private auth:AuthService
  ){}

  ngAfterViewInit(): void {
    // abrir modal de carga inicial
    this.modalInicial.abrirModal();

    this.getUsers();
  }

  private getUsers(){
    // limpiar array de users para que no se acumulen incorrectamente desde de eliminar un user
    this.users = [];

    // llamo al servicio
    this.auth.getUsers().subscribe(
      data => {
        if(data.message=='exito'){
          this.users = data.users;
        }
        else{
          this.users = [];
          console.log('error al obtener los usuarios');
        }
        this.modalInicial.cerrarModal();
      }
    );
  }

  deleteUser(user:UserModel){
    // obtengo el usuario actual
    const currentUser = localStorage.getItem('usuario');
    
    /* verifico si el usuario que quiero eliminar no es el que hizo sesion 
    ya que no puedes eliminarte a ti mismo */
    if(currentUser!=user.email){
      // son distintos => puedo eliminar el usuario
      
      // llamo al servicio
      this.auth.deleteUser(user._id).subscribe(
        response => {
          if(response.message=='exito'){
            alert('exito al eliminar usuario');
            this.getUsers();
          }
          else{
            alert('error al eliminar el usuario');
          }
        }
      );
    }
    else{
      // no se puede eliminar al usuario que hizo sesion => mostrar modal con esta info
      alert('no puedes eliminarte a ti mismo');
    }
  }

}
