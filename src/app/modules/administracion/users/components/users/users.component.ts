import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ModalAccionComponent } from 'src/app/shared/components/modal-accion/modal-accion.component';
import { ModalCargaInicialComponent } from 'src/app/shared/components/modal-carga-inicial/modal-carga-inicial.component';
import { ModalConsultaComponent } from 'src/app/shared/components/modal-consulta/modal-consulta.component';
import { ModalInfoComponent } from 'src/app/shared/components/modal-info/modal-info.component';
import { ModalConsulta } from 'src/app/shared/models/modal-consulta.model';
import { ModalInfoModel } from 'src/app/shared/models/modal-info.model';
import { ModalModel } from 'src/app/shared/models/modal.model';
import { UserModel } from 'src/app/shared/models/users.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import Popover from 'bootstrap/js/dist/popover';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit{

  users:UserModel[] = [];
  selectedUser!:UserModel;
  action!:string;
  currentUser!:string;

  // acceder al componente hijo modalCargaInicial para usar sus metodos
  @ViewChild(ModalCargaInicialComponent) modalInicial!:ModalCargaInicialComponent;

  // accedo al componente hijo modalAccion
  @ViewChild(ModalAccionComponent) modalAccion!:ModalAccionComponent;

  // accedo al componente hijo modalInfo
  @ViewChild(ModalInfoComponent) modalInfo!:ModalInfoComponent;

  // accedo al componente hijo modalConsulta
  @ViewChild(ModalConsultaComponent) modalConsul!:ModalConsultaComponent;

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

  // modelo de modal de consulta de eliminacion de usuario
  modalQueryDelete:ModalConsulta = {
    title:'Eliminar Usuario',
    textoBodyModal: '¿Está seguro que desea eliminar el usuario?'
  }

  popoverInstance:Popover[]=[];

  ngOnInit(): void {
    // obtengo el rol del usuario que inicio sesión
    this.currentUser = localStorage.getItem('rol') || '';
  }

  constructor(
    private auth:AuthService,
    private router:Router
  ){}

  ngAfterViewInit(): void {
    // abrir modal de carga inicial
    this.modalInicial.abrirModal();

    this.getUsers();

    // this.addPopovers();
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
        setTimeout(() => {
          this.addPopovers();
        }, 50);
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
      
      /* primero consulto al usuario si quiere eliminar el usuario
      mediante un modal de consulta => abrir modal de consulta*/
      this.modalConsul.abrirModalConsulta();
      this.selectedUser = user;
      this.action='deleteUser';
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

  eliminarUsuario(){
    // abrir modal
    this.modalDeleteUser.textoBodyModal = 'Eliminando usuario...';
    this.modalAccion.abrirModal();

    // llamo al servicio
    this.auth.deleteUser(this.selectedUser._id).subscribe(
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

  aceptar(){
    // reiniciar variables de modal
    this.modalDeleteUser.hab_btn = false;
    this.modalDeleteUser.textoBodyModal = '';
  }

  okInfo(){
    // reiniciar variables del modal
    this.modalInformacion = {
      title: '',
      textoBodyModal: ''
    }
  }

  okConsulta(){
    if(this.action==='deleteUser'){
      // eliminar usuario
      this.eliminarUsuario();
    }
  }

  editar(id:string){
    // destruir popovers antes de redirigir a update
    this.popoverInstance.forEach(elem => {
      elem.dispose();
    });

    // redirigir a updateuser
    this.router.navigate(['/admin/principal/updateuser',id]);
  }

  private addPopovers(){
    // agrego los popovers a los botones que tengan el atributo data-bs-toggle="popover"
    Array.from(document.querySelectorAll('[data-bs-toggle="popover"]')).forEach(
      popoverNode => this.popoverInstance.push(
        new Popover(popoverNode,{
          trigger:'hover',
          container:'body'
        })
      )
    );
  }

}
