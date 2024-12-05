import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements AfterViewInit{

  @ViewChild('mainElement') mainElem !: ElementRef<HTMLElement>;

  pantallaChica!:boolean;
  
  constructor(
    private router:Router,
    private auth:AuthService
  ){}

  ngAfterViewInit(): void {
    // Detectar el tamaño de la pantalla al iniciar la aplicación
    const windowWidth = window.innerWidth;
    if(windowWidth<=991){
      this.pantallaChica = true;
    }
    else{
      this.pantallaChica = false;
      this.mainElem.nativeElement.classList.add('container-fluid');
    }
  }

  // detectar cambios en las dimensiones de la pantalla para modificar el menu de herramientas
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    // obtener ancho actual de la pantalla
    const windowWidth = (event.target as Window).innerWidth;
    console.log('window: ',windowWidth)

    // verificar si es una pantalla chica (w<991px)
    if(windowWidth<=991){
      // es una pantalla chica
      this.pantallaChica = true;
      this.mainElem.nativeElement.classList.remove('container-fluid');
    }
    else{
      // no es una pantalla chica
      this.pantallaChica = false;
      this.mainElem.nativeElement.classList.add('container-fluid');
    }
  }

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
