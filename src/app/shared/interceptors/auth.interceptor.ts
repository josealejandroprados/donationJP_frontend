import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const token = localStorage.getItem('token');

    if(token){
      const requestCloned = request.clone({
        headers: request.headers.set('Auth',token)
      });
      return next.handle(requestCloned);
    }
    else{
      return next.handle(request);
    }
    
  }
}
