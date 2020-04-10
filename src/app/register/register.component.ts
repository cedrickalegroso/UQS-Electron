import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {TermsDialogComponent} from '../terms-dialog/terms-dialog.component'
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  registerFormGroup: FormGroup;
  isDisabled = true;

  constructor(
    public user$: AuthService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {

      // the register form group
      this.registerFormGroup = this._formBuilder.group({
        username: ['', Validators.required],
        email: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        password: ['', Validators.required]
      });

  }

  register(value) {
  this.user$.userEmailSignUp(value)
      .then(res => {
        console.log(res)
      }, err => {
        console.log(err)
      }); 
  }

 // open dialog
  openDialog(): void{
    const dialogRef = this.dialog.open(TermsDialogComponent, {
    width: '540px',
    height: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
     console.log(result);
    });
  }

}
