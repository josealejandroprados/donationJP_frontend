import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-lateral',
  templateUrl: './nav-lateral.component.html',
  styleUrls: ['./nav-lateral.component.css']
})
export class NavLateralComponent implements OnInit{

  currentUserRol!:string;

  ngOnInit(): void {
    this.currentUserRol = localStorage.getItem('rol') || '';
  }

}
