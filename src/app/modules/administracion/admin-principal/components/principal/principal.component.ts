import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {

  constructor(
    private router:Router,
    private auth:AuthService
  ){}

  logout(){
    this.auth.logout();
    this.router.navigate(['/admin/login']);

    setTimeout(() => {
      window.location.reload();
    }, 200);
  }

  getUser(){
    return localStorage.getItem('usuario');
  }

  getRol(){
    return localStorage.getItem('rol');
  }
  
}
