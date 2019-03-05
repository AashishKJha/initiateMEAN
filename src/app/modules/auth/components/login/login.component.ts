import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import {Router} from '@angular/router'
import { LoginInterface } from '../../interfaces/login-interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
}) 
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private auth: AuthService<LoginInterface>, private _fb: FormBuilder, private route: Router) {

  }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this._fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    })
  }

  getData() {
    this.auth.authenticate(this.loginForm.value).subscribe((logResp: any) => {
      if (logResp.success && logResp.data.token){
        localStorage.setItem('token', logResp.data.token);
        this.route.navigate(['user/profile']);
      } else {
        alert("Token Not Found")
      }
    }, (err) => {
      alert(err.error.message);
    })
  }
}
