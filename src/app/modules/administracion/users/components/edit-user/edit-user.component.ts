import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalAccionComponent } from 'src/app/shared/components/modal-accion/modal-accion.component';
import { ModalCargaInicialComponent } from 'src/app/shared/components/modal-carga-inicial/modal-carga-inicial.component';
import { ModalModel } from 'src/app/shared/models/modal.model';
import { UserModel } from 'src/app/shared/models/users.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, AfterViewInit{

  id:any;

  formEdit = new FormGroup({
    'nombre': new FormControl('',Validators.required),
    'apellido': new FormControl('',Validators.required),
    'email': new FormControl('',[Validators.required, Validators.email]),
    'rol': new FormControl('user',Validators.required),
  });
  
  modalUpdateUser:ModalModel = {
    title:'Modificar Usuario',
    hab_btn: false,
    textoBodyModal:'',
    textoBtn:'Aceptar'
  }
  
  @ViewChild(ModalAccionComponent) modal_accion!:ModalAccionComponent;
  @ViewChild(ModalCargaInicialComponent) modal_inicial!:ModalCargaInicialComponent;
  
  ngOnInit(): void {
    this.activRout.params.subscribe(params => this.id = params['id']);
  }

  constructor(
    private router:Router,
    private activRout:ActivatedRoute,
    private auth:AuthService
  ){}

  ngAfterViewInit(): void {
    // abrir modal de carga inicial
    this.modal_inicial.abrirModal();

    this.obtenerUsuario();
  }

  private obtenerUsuario(){
    // llamo al servicio
    this.auth.getUser(this.id).subscribe(
      data => {
        if(data.message=='exito'){
          this.valoresIniciales(data.user);
        }
        else{
          console.log('error al obtener el usuario');
        }
        // cerrar modal inicial
        this.modal_inicial.cerrarModal();
      }
    );
  }

  modificar(){
    if(this.formEdit.valid){

      // abrir modal
      this.modalUpdateUser.textoBodyModal = 'Modificando usuario...';
      this.modal_accion.abrirModal();

      // realizar update => llamo al servicio
      this.auth.updateUser(this.id,this.formEdit.value).subscribe(
        response => {
          if(response.message==='exito'){
            this.modalUpdateUser.textoBodyModal = 'Usuario modificado con éxito';
            this.modalUpdateUser.hab_btn = true;
          }
          else{
            this.modalUpdateUser.textoBodyModal = '¡Ha ocurrido un error! No se pudo modificar el usuario';
            this.modalUpdateUser.hab_btn = true;
          }
        }
      );
    }
  }

  aceptar(){
    // reinicio variables
    this.modalUpdateUser.textoBodyModal = '';
    this.modalUpdateUser.hab_btn = false;
    this.router.navigate(['admin/principal/users']);
  }

  private valoresIniciales(iniciales:UserModel){
    this.formEdit.setValue({
      nombre: iniciales.nombre,
      apellido: iniciales.apellido,
      email: iniciales.email,
      rol: iniciales.rol
    });
  }

  //getters
  get nombre(){
    return this.formEdit.get('nombre') as FormControl;
  }
  get apellido(){
    return this.formEdit.get('apellido') as FormControl;
  }
  get email(){
    return this.formEdit.get('email') as FormControl;
  }
  get rol(){
    return this.formEdit.get('rol') as FormControl;
  }
}
