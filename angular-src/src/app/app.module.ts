import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { StandardComponent } from './components/standard/standard.component';
import { AdminComponent } from './components/admin/admin.component';
import { NavbarComponent } from './components/standard/navbar/navbar.component';
import { TestsComponent } from './components/standard/tests/tests.component';
import { PcrComponent } from './components/standard/tests/pcr/pcr.component';
import { FastComponent } from './components/standard/tests/fast/fast.component';
import { SelfComponent } from './components/standard/tests/self/self.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    LoginComponent,
    RegisterComponent,
    StandardComponent,
    AdminComponent,
    NavbarComponent,
    TestsComponent,
    PcrComponent,
    FastComponent,
    SelfComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
