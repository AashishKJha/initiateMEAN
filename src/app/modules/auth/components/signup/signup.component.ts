import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupInterface } from '../../interfaces/signup-interface';
import { LoginInterface } from '../../interfaces/login-interface';
import { CommonInterace } from '../../../../core/interfaces/common-interface';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, CommonInterace {

  signupForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private auth: AuthService<SignupInterface>) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.signupForm = this._fb.group({
      usertype: [null],
      firstName: [null, [Validators.required]],
      middleName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      dateOfBirth: [null, [Validators.required]],
      password: [null, [Validators.required]],
      email: [null, [Validators.required]],
      mobilenumber: [null, [Validators.required]],
    })
  }

  performSignup() {
    if (this.signupForm.valid) {
      this.auth.signup(this.signupForm.value).subscribe((resp) => {
        console.log(resp);
      }, (err) => {
        console.log(err);
      })
    }
  }
}
