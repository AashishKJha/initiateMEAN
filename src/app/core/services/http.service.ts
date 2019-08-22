import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpServiceInterface } from '../interfaces/HttpServiceInterface';

@Injectable({
  providedIn: 'root'
})
export class HttpService<B> implements HttpServiceInterface<B> {

  constructor(private http: HttpClient) { }
  
  public get(url: string, options? : any): Observable<ArrayBuffer> {
    return this.http.get(environment.hostName + url, this.requestHeaders(options));
  }

  public post(url: string, body: B, options?: any) : Observable<ArrayBuffer> {
    return this.http.post(environment.hostName + url, body, this.requestHeaders(options));
  }

  public put(url: string, body: B, options?: any): Observable<ArrayBuffer>{
    return this.http.put(url, body, this.requestHeaders(options))
  }

  public delete(url: string, options?: any) : Observable<ArrayBuffer> {
    return this.http.delete(url, this.requestHeaders(options))
  }

  private requestHeaders(options) : any {
    let headersOptions = {};
    if (!options && localStorage.getItem('token')){
      headersOptions = {
        headers: new HttpHeaders({
          "Authorization": localStorage.getItem('token'),
          "Content-Type": "application/json"
        })
      }
    } else{
      headersOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      }
    }
    return headersOptions;
  }
}
