import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalAccionComponent } from 'src/app/shared/components/modal-accion/modal-accion.component';
import { ModalModel } from 'src/app/shared/models/modal.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formRegister = new FormGroup({
    'nombre': new FormControl('',Validators.required),
    'apellido': new FormControl('',Validators.required),
    'email': new FormControl('',[Validators.required, Validators.email]),
    'password': new FormControl('',Validators.required),
    'rol': new FormControl('user',Validators.required),
  });

  modalRegisterUser:ModalModel = {
    title:'Registrar Usuario',
    hab_btn: false,
    textoBodyModal:'',
    textoBtn:'Aceptar'
  }
  
  @ViewChild(ModalAccionComponent) modal_accion!:ModalAccionComponent;
  
  constructor(
    private router:Router,
    private auth:AuthService
  ){}

  registrar(){
    if(this.formRegister.valid){

      // obtener usuario en newUser
      let newUser = {
        nombre:this.formRegister.value.nombre,
        apellido:this.formRegister.value.apellido,
        email:this.formRegister.value.email,
        password:this.formRegister.value.password,
        rol:this.formRegister.value.rol,
      }


      // abrir modal
      this.modalRegisterUser.textoBodyModal = 'Registrando usuario...';
      this.modal_accion.abrirModal();

      // hacer registro
      this.auth.register(newUser).subscribe(result => {
        if(result.message=='exito'){
          // registro realizado con exito
          this.modalRegisterUser.hab_btn = true;
          this.modalRegisterUser.textoBodyModal = 'Registro realizado con exito';
        }
        else{
          this.modalRegisterUser.hab_btn = true;
          this.modalRegisterUser.textoBodyModal = '¡Ha ocurrido un error! No se pudo realizar el registro';
        }
      });
    }
  }

  aceptar(){
    // reinicio variables de modal
    this.modalRegisterUser.textoBodyModal = '';
    this.modalRegisterUser.hab_btn = false;
    this.router.navigate(['admin/principal/users']);
  }

  //getters
  get nombre(){
    return this.formRegister.get('nombre') as FormControl;
  }
  get apellido(){
    return this.formRegister.get('apellido') as FormControl;
  }
  get email(){
    return this.formRegister.get('email') as FormControl;
  }
  get rol(){
    return this.formRegister.get('rol') as FormControl;
  }
  get password(){
    return this.formRegister.get('password') as FormControl;
  }
  
}
