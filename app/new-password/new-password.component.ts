import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { CognitoCallback,CognitoService } from '../service/cognito.service';
import { UserregistrationService } from '../service/userregistration.service';


export class NewPasswordUser {
    username: string;
    existingPassword: string;
    password: string;
}

@Component({
  selector: 'new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements CognitoCallback {

	registrationUser: NewPasswordUser;
	router: Router;
  //userregister:UserregistrationService
  errorMessage: string;

  constructor(public userregistration:UserregistrationService,router: Router) { 
  	this.router = router;
    //this.userregister = userregister;
  	this.onInit();
  }

  onInit(){
  	this.registrationUser = new NewPasswordUser();
    this.errorMessage = null;
  }

  ngOnInit() {
   this.errorMessage = null;
  }

  onRegister(){
  	console.log(this.registrationUser.username);
    this.errorMessage = null;
    this.userregistration.newpassword(this.registrationUser,this);
  }

  onCancel(){
    this.router.navigate(['securehome']);
  }
  cognitoCallback(message: string, result: any) {

      if(message!=null){
       this.errorMessage = message;
      }else{
        //console.log("Password changed");
        this.router.navigate(['']);
      }

      //console.log(" Inside the registration issue might be some thing is wrong ");
  }
}
