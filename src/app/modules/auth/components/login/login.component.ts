import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalAccionComponent } from 'src/app/shared/components/modal-accion/modal-accion.component';
import { ModalModel } from 'src/app/shared/models/modal.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formlogin = new FormGroup({
    'email': new FormControl('',[Validators.required,Validators.email]),
    'password': new FormControl('',Validators.required)
  });

  modalLogin:ModalModel = {
    title:'Iniciar Sesión',
    hab_btn: false,
    textoBodyModal:'',
    textoBtn:'Aceptar'
  }

  @ViewChild(ModalAccionComponent) modal_accion!:ModalAccionComponent;
  
  constructor(
    private auth:AuthService,
    private router:Router
  ){}

  iniciar(){
    if(this.formlogin.valid){
      // abrir modal
      this.modalLogin.textoBodyModal = 'Iniciando...';
      this.modal_accion.abrirModal();

      let user = {
        email: this.formlogin.value.email,
        password: this.formlogin.value.password
      }

      this.auth.login(user).subscribe(resultado => {
        if(resultado.auth==true){
          // inicio de sesión exitoso
          this.modalLogin.hab_btn = true;
          this.modalLogin.textoBodyModal = 'Inicio de sesión exitoso, Bienvenido';

          // guardar datos de sesión en localStorage
          localStorage.setItem("token", resultado.token);
          localStorage.setItem("usuario", resultado.usuario);
          localStorage.setItem("rol", resultado.rol);
        }
        else{
          // error al hacer login
          this.modalLogin.hab_btn = true;
          this.modalLogin.textoBodyModal = resultado.message;
        }
      });
    }
  }

  aceptar(){
    this.modalLogin.hab_btn = false;
    this.modalLogin.textoBodyModal = '';
    if(localStorage.getItem('token')?true:false){
      this.router.navigate(['/admin/principal/donations']);
    }
    else{
      this.router.navigate(['/admin/login']);
    }
  }

  // getters
  get email(){
    return this.formlogin.get('email') as FormControl;
  }
  get password(){
    return this.formlogin.get('password') as FormControl;
  }
}
