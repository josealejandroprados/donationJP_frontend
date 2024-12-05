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

  deleteUser(id:string){
    return this.http.delete<any>(`${this.baseUrl}/deleteuser/${id}`);
  }

  getUser(id:number){
    return this.http.get<any>(`${this.baseUrl}/getuser/${id}`);
  }

  updateUser(id:number, user:any){
    return this.http.put<any>(`${this.baseUrl}/updateuser/${id}`,user)
  }

  EmailAvailable(email:string){
    return this.http.get<any>(`${this.baseUrl}/emailavailable/${email}`).pipe(
      map(respuesta => respuesta.available)
    );
  }

  modificarPassword(formPass:any){
    return this.http.put<any>(`${this.baseUrl}/updatepassword`,formPass);
  }
  
}
