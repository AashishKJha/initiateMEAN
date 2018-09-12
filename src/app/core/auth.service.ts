import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getData(reqData): Observable<any> {
    let reqUrl = "http://localhost:3000/auth/login";
    return this.http.post(reqUrl, reqData);
  }

  signup(registerData: any): Observable<any>{
    let reqUrl = "http://localhost:3000/auth/register";
    return this.http.post(reqUrl, registerData)    
  }
}
