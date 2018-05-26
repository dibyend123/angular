import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoginService } from '../service/login.service';
import { CognitoCallback,CognitoService } from '../service/cognito.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, CognitoCallback{

	username:number;
	password:string;
	errorMessage:string;

  constructor(public loginservice:LoginService,public router: Router,) {

  		this.errorMessage = null;
  }

  ngOnInit() {
  }

  onLogin(){

  	if(this.username == null || this.password == null ){
  		this.errorMessage = "Input required for the username and password ";

  		return;
  	}

  	if(isNaN(this.username)){
  			this.errorMessage = "UserName must be a digit ";
  			return;
  	}

    this.loginservice.authenticate(this.username,this.password,this);
  }

  cognitoCallback(message:string,result:any){

    console.log(" Inside the cognito call back ");

    if(message!=null){
      console.log(" message is not null and there is something ");
      if(message === 'user needs to set the password' ){
        this.router.navigate(['/home/newPassword']);
      }
      if(message === 'Not Authorized please contact system admin' ){
        this.errorMessage = 'Not Authorized please contact system admin';
      }

    }else{
      //console.log(" message is null and everything is ok ");
      this.router.navigate(['securehome']);
    }

  }

}
