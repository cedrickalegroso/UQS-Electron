import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';



import { FlexLayoutModule } from '@angular/flex-layout';

import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';

//firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';


//material
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

//env
import { environment } from '../environments/environment';
import { DashboardComponent, accountDialog} from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TermsComponent } from './terms/terms.component';
import { TermsDialogComponent } from './terms-dialog/terms-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    TermsComponent,
    TermsDialogComponent,
    accountDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    MatGridListModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatCardModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [accountDialog],
})
export class AppModule { }
