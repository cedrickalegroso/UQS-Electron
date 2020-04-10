import { Injectable } from '@angular/core';
import { Ticket } from './ticket.model';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Component, OnInit } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private TicketsCollection: AngularFirestoreCollection<Ticket>;
  tickets$: Observable<Ticket[]>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
  ) {

   this.tickets$ = this.afAuth.authState.pipe(
      switchMap( user => {
        if (user) {
          this.TicketsCollection = afs.collection<Ticket>('tickets', ref => {
             return ref 
                .where('ticketOwnerUid', '==', user.uid)
                .where('ticketStatus', '==', 1 )
                .limit(5)
          });
          
         return  this.tickets$ = this.TicketsCollection.valueChanges();
        } else {
          return of(null);
        }
      })
    );


   }
}
