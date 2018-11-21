import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CommonService {

   /**
   * Main Service.
   */

  constructor(private http: HttpClient) { }

  get(url:string): Observable<Object>{
    return this.http.get(url);
  }

  post(url:string, body:string){
    return this.http.post(url, body);
  }
}
