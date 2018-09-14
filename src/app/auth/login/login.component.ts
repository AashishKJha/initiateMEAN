import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Route, Router, ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
}) 
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private auth: AuthService, private _fb: FormBuilder, private route: Router) {

  }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this._fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    })
  }

  getData() {
    this.auth.getData(this.loginForm.value).subscribe(logResp => {
      if (logResp.token){
        localStorage.setItem('token', logResp.token);
        this.route.navigate(['user/profile']);
      } else {
        alert("Token Not Found")
      }
    }, err => {
      alert(err.error.message);
    })
  }
}
