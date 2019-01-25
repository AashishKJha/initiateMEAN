import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private _fb : FormBuilder, private auth : AuthService) { }

  ngOnInit() {
    this.createSignUpForm();
  }

  createSignUpForm() : void{
    this.signupForm = this._fb.group({
      usertype: [null],
      username : [null, [Validators.required]],
      password: [null, [Validators.required]],
      email: [null, [Validators.required]],
      mobilenumber :[null, [Validators.required]],
    })
  }

  performSignup(){
    if(this.signupForm.valid){
      this.auth.signup(this.signupForm.value).subscribe((resp) => {
        console.log(resp)
        alert(resp.message);
      }, (err) => {
        console.log(err);
        alert(err);
      })
    }
  }
}
