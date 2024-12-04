import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  private baseUrl:string = environment.baseUrl;
  
  constructor(private http:HttpClient) { }

  getDonations(){
    return this.http.get<any>(`${this.baseUrl}/payments`);
  }

  getDonation(id:string){
    return this.http.get<any>(`${this.baseUrl}/payment/${id}`);
  }

  deletePayment(id:string){
    return this.http.delete<any>(`${this.baseUrl}/deletepayment/${id}`);
  }
}
