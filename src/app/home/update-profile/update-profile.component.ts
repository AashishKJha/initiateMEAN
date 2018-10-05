import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  updateForm: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.updateForm = this._fb.group({
      username : this._fb.control(null, [Validators.required]),
    })
  }
}
