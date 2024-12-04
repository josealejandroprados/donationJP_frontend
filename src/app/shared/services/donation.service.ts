import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  private baseUrl:string = environment.baseUrl;
  
  constructor(private http:HttpClient) { }

  createDonation(donationData:any){
    return this.http.post<any>(`${this.baseUrl}/create-order`,donationData);
  }
}
