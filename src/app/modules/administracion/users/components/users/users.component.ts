import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ModalAccionComponent } from 'src/app/shared/components/modal-accion/modal-accion.component';
import { ModalCargaInicialComponent } from 'src/app/shared/components/modal-carga-inicial/modal-carga-inicial.component';
import { ModalInfoComponent } from 'src/app/shared/components/modal-info/modal-info.component';
import { ModalInfoModel } from 'src/app/shared/models/modal-info.model';
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

  // acceder al componente hijo modalCargaInicial para usar sus metodos
  @ViewChild(ModalCargaInicialComponent) modalInicial!:ModalCargaInicialComponent;

  // accedo al componente hijo modalAccion
  @ViewChild(ModalAccionComponent) modalAccion!:ModalAccionComponent;

  // accedo al componente hijo modalInfo
  @ViewChild(ModalInfoComponent) modalInfo!:ModalInfoComponent;

  // modelo de modal para eliminar un usuario
  modalDeleteUser:ModalModel = {
    title:'Eliminar Usuario',
    textoBodyModal: '',
    textoBtn: 'Aceptar',
    hab_btn: false
  }

  // modelo de modal info
  modalInformacion:ModalInfoModel = {
    title:'',
    textoBodyModal:''
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
      
      // abrir modal
      this.modalDeleteUser.textoBodyModal = 'Eliminando usuario...';
      this.modalAccion.abrirModal();

      // llamo al servicio
      this.auth.deleteUser(user._id).subscribe(
        response => {
          if(response.message=='exito'){
            this.modalDeleteUser.textoBodyModal = '¡Usuario eliminado con éxito!';
            this.modalDeleteUser.hab_btn = true;
            this.getUsers();
          }
          else{
            this.modalDeleteUser.textoBodyModal = '¡Error al eliminar el usuario!';
            this.modalDeleteUser.hab_btn = true;
          }
        }
      );
    }
    else{
      // no se puede eliminar al usuario que hizo sesion => mostrar modal con esta info
      this.modalInformacion = {
        title: 'Eliminar Usuario',
        textoBodyModal: '¡No puedes eliminarte a ti mismo'
      }
      // abrir modal info
      this.modalInfo.abrirModal();
    }
  }

  aceptar(){
    // reiniciar variables de modal
    this.modalDeleteUser.hab_btn = false;
    this.modalDeleteUser.textoBodyModal = '';
  }

  ok(){
    // reiniciar variables del modal
    this.modalInformacion = {
      title: '',
      textoBodyModal: ''
    }
  }

}
