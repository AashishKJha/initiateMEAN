import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router} from '@angular/router'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userData: any = null;

  constructor(private auth: AuthService, private route : Router) { }

  ngOnInit() {
    this.auth.getUserProfile().subscribe(resp => {
      this.userData = resp[0];
    })
  }

  logout() {
    if (this.auth.signout()) {
       this.route.navigate(['auth/login']);
    }
  }
}
