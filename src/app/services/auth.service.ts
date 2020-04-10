import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './user.model';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`userCollection/${user.uid}`).valueChanges()
        } else {
          return of(null);
        }
      })
    );
  }


  //register 
  async userEmailSignUp(value) {
    const credential = await this.afAuth.createUserWithEmailAndPassword(value.email, value.password)
    return this.userUpdateData(credential.user, value);
  }

  //logim
  async userEmailSignin(value) {
   await this.afAuth.signInWithEmailAndPassword(value.email, value.password)
    this.router.navigate(['/dashboard']);
  }



  private userUpdateData(user, value) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`userCollection/${user.uid}`);

    const data = {
      uid: user.uid,
      email: value.email,
      displayName: value.username,
      phoneNumber: value.phoneNumber,
      //photoURL: 'https://firebasestorage.googleapis.com/v0/b/theuqs-52673.appspot.com/o/default%2FppDef.png?alt=media&token=ee4c1229-d521-47a3-91f0-1c2cd70e2232',
    };

    this.router.navigate(['/dashboard']);
    return userRef.set(data, { merge: true });
  }


  async signOut() {
    await this.afAuth.signOut();
    return this.router.navigate(['/']);
  }


}

