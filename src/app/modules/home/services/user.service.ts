import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../../core/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpService) { }

  getProfile() : Observable<any> {
    let reqUrl = "api/user/profile";
    return this.http.get(reqUrl);
  }

  updateProfile(profileData : any) : Observable<any> {
    let reqUrl = "api/user/profile";
    return this.http.post(reqUrl, profileData);
  }
}
