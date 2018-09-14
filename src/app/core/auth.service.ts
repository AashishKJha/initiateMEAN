import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getData(reqData): Observable<any> {
    let reqUrl = "http://localhost:3000/auth/login";
    return this.http.post(reqUrl, reqData);
  }

  signup(registerData: any): Observable<any> {
    let reqUrl = "http://localhost:3000/auth/register";
    return this.http.post(reqUrl, registerData)
  }

  getUserProfile(): Observable<any> {
    let reqUrl = "http://localhost:3000/user/profile";

    const token = localStorage.getItem('token');
  
    if (token) {
      let header = new HttpHeaders({
        'Authorization': token
      });
      return this.http.get(reqUrl, { headers: header });
    } else {
      alert('You Are not Logged In');
      return;
    }
  }

  signout() : boolean{
    const token = localStorage.getItem('token');
    if(token){
      localStorage.removeItem('token');
      return true
    }
    return false;
  }
}
