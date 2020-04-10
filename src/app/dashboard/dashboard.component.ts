import { Component, OnInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Service } from '../services/services.model';
import { Observable, of } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


import * as firebase from "firebase/app";
export interface Ticket {
  sid: string;
  uid: string;
  abb: string;
}

//auth
import { AuthService } from '../services/auth.service';
import { TicketService } from '../services/ticket.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {



  isHiddenTickets = false;
  isHiddenServices = true;
  
  readonly ROOT_URL_cancelTicket = 'https://us-central1-theuqs-52673.cloudfunctions.net/app/api/CancelTicket:refNo';
  readonly ROOT_URL_createTicket = 'https://us-central1-theuqs-52673.cloudfunctions.net/app/api/creaticketNew:sid:uid:abb';
  readonly ROOT_URL_Univeristies = 'https://us-central1-theuqs-52673.cloudfunctions.net/app/api/getUniversity/';
  readonly ROOT_URL_Governments = 'https://us-central1-theuqs-52673.cloudfunctions.net/app/api/getGovernment/';
  readonly ROOT_URL_Banks = 'https://us-central1-theuqs-52673.cloudfunctions.net/app/api/getBanks/';

  mode: ProgressSpinnerMode = 'indeterminate';

  universities: any;
  governmnents: any;
  banks: any;

  newTicket: Observable<any>;

  panelOpenState = false;


  constructor(
    private http: HttpClient,
    public user$: AuthService,
    public tix$: TicketService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getUniverities();
    this.getGovernments();
    this.getBanks();
  }

  getUniverities() {
    this.universities = this.http.get(this.ROOT_URL_Univeristies)
  }

  getGovernments() {
    this.governmnents = this.http.get(this.ROOT_URL_Governments)
  }

  getBanks() {
    this.banks = this.http.get(this.ROOT_URL_Banks)
  }

  createTicketUniv(university) {
    const user = firebase.auth().currentUser;
    const ticketData = {
      sid: university.uid,
      abb: university.abbreviation,
      uid: user.uid
    }
    this.http.post(this.ROOT_URL_createTicket, ticketData).toPromise().then(data => {
      console.log(data)
    });
  }

  createTicketGov(governmnent) {
    const user = firebase.auth().currentUser;
    const ticketData = {
      sid: governmnent.uid,
      abb: governmnent.abbreviation,
      uid: user.uid
    }
    this.http.post(this.ROOT_URL_createTicket, ticketData).toPromise().then(data => {
      console.log(data)
    });
  }

  createTicketBank(bank) {
    const user = firebase.auth().currentUser;
    const ticketData = {
      sid: bank.uid,
      abb: bank.abbreviation,
      uid: user.uid
    }
    this.http.post(this.ROOT_URL_createTicket, ticketData).toPromise().then(data => {
      console.log(data)
    });
  }

  cancelTicket(ticket){

    console.log(ticket.refNo)

    const ticketData = {
      refNo: ticket.refNo,
    }
 
    this.http.post(this.ROOT_URL_cancelTicket, ticketData).toPromise().then(data => {
      console.log(data)
    });
  }

  showTickets() {
    this.isHiddenTickets = false;
    this.isHiddenServices = true

    let tabActive1 = document.getElementsByClassName('tabActive1') as HTMLCollectionOf<HTMLElement>;
    let tabActive2 = document.getElementsByClassName('tabActive2') as HTMLCollectionOf<HTMLElement>;

    if (tabActive1.length != 0) {
      tabActive1[0].style.color = "#4267B2";
    }

    if (tabActive2.length != 0) {
      tabActive2[0].style.color = "lightgrey";
    }

  }
  showService() {
    this.isHiddenTickets = true;
    this.isHiddenServices = false

    let tabActive1 = document.getElementsByClassName('tabActive1') as HTMLCollectionOf<HTMLElement>;
    let tabActive2 = document.getElementsByClassName('tabActive2') as HTMLCollectionOf<HTMLElement>;

    if (tabActive1.length != 0) {
      tabActive1[0].style.color = "lightgrey";
    }

    if (tabActive2.length != 0) {
      tabActive2[0].style.color = "#4267B2";
    }

  }

  openAccountDialog(): void {
    const dialogRef = this.dialog.open(accountDialog, {
      width: '400px',
      height: '600px'
    });


  }

}


@Component({
  selector: 'app-servicedashboard',
  templateUrl: 'accountdialog.html',
})
export class accountDialog {

  mode: ProgressSpinnerMode = 'indeterminate';
  dataUpdate: FormGroup;
  securityUpdateform: FormGroup;

  constructor(

    public user$: AuthService,
    public dialog: MatDialog,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit() {





    this.dataUpdate = this._formBuilder.group({
      displayName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
    this.securityUpdateform = this._formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });



  }




  updateData(value) {

  }


  securityUpdate(value) {



  }




}