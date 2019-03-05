import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { HttpService } from '../../../core/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService<B> {

  constructor(private auth: HttpService<any>) { }

  
  authenticate(logInData : B): Observable<ArrayBuffer> {
    let reqUrl = "api/auth/login";
    return this.auth.post(reqUrl, logInData);
  }

  signup(registerData: B): Observable<ArrayBuffer> {
    let reqUrl = "api/auth/register";
    return this.auth.post(reqUrl, registerData)
  }

  signout(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      localStorage.removeItem('token');
      return true;
    }
    return false;
  }
}
