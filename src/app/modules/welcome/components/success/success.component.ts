import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit{

  ngOnInit(): void {
    // capturar parametros de la url
    this.activRout.queryParams.subscribe(
      params => {
        console.log('parametros de la donacion:\n ',params);
      }
    );
  }
  constructor(
    private activRout:ActivatedRoute
  ){}
  
}
