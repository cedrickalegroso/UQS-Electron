import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    public user$: AuthService,
  ) { }

  ngOnInit(): void {


    // the register form group
    this.loginFormGroup = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }


  login(value) {
   this.user$.userEmailSignin(value)
      .then(res => {
        console.log(res)
      }, err => {
        console.log(err)
      }); 
  }

}
