import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { routing } from './app.routes';
import { LoginService } from "./service/login.service";
import { CognitoService } from "./service/cognito.service";
import { UserregistrationService } from "./service/userregistration.service";
import { NewPasswordComponent } from './new-password/new-password.component';
import { SecurehomeComponent } from './securehome/securehome.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewPasswordComponent,
    SecurehomeComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule
   
  ],
  providers: [
    LoginService,
    CognitoService,
    UserregistrationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
