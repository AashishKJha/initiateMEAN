import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { CommonService } from '../core/common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: CommonService) { }

  /**
   * Modelling Todo
   */

  getData(logInData): Observable<any> {
    let reqUrl = "api/auth/login";
    return this.auth.post(reqUrl, logInData);
  }

  signup(registerData: any): Observable<any> {
    let reqUrl = "api/auth/register";
    return this.auth.post(reqUrl, registerData)
  }

  getUserProfile(): Observable<any> {
    let reqUrl = "api/user/profile";
    const token = localStorage.getItem('token');
    
    if (token) {
      let header = new HttpHeaders({
        'Authorization': token
      });
      return this.auth.get(reqUrl);
    } else {
      alert('You Are not Logged In');
      return;
    }
  }

  signout(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      localStorage.removeItem('token');
      return true
    }
    return false;
  }
}
