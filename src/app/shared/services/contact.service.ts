import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private baseUrl = environment.baseUrl;
  
  constructor(private http:HttpClient) { }

  sendEmail(email:any){
    console.log(email);
    return this.http.post<any>(`${this.baseUrl}/sendemail`,email);
  }
}
