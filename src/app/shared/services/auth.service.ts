import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseUrl;
  
  constructor(private http:HttpClient) { }

  register(formRegister:any){
    return this.http.post<any>(`${this.baseUrl}/register`,formRegister);
  }

  login(user:any){
    return this.http.post<any>(`${this.baseUrl}/login`,user);
  }

  logout(){
    // borrar todo en localStorage
    localStorage.clear();
  }

  getUsers(){
    return this.http.get<any>(`${this.baseUrl}/users`);
  }

  deleteUser(id:number){
    return this.http.delete<any>(`${this.baseUrl}/deleteUser/${id}`);
  }

  getUser(id:number){
    return this.http.get<any>(`${this.baseUrl}/getUser/${id}`);
  }

  updateUser(id:number, user:any){
    return this.http.put<any>(`${this.baseUrl}/updateUser/${id}`,user)
  }

  EmailAvailable(email:string){
    return this.http.get<any>(`${this.baseUrl}/emailAvailable/${email}`).pipe(
      map(respuesta => respuesta.available)
    );
  }

  modificarPassword(formPass:any){
    return this.http.put<any>(`${this.baseUrl}/modificarPassword`,formPass);
  }
  
}
