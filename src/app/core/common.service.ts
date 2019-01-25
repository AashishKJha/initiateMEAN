import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

   /**
   * Main Service.
   */

  constructor(private http: HttpClient) { }

  get(url:string): Observable<Object>{
    return this.http.get(environment.hostName +  url);
  }

  post(url:string, body:string){
    return this.http.post(environment.hostName + url, body);
  }
}
