import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: any = null;

  constructor(private user : UserService, private route : Router) { }

  ngOnInit() {
    this.user.getProfile().subscribe(resp => {
      this.userData = resp[0];
    })
  }
}
