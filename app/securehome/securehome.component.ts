import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

import { LoggedInCallback,CognitoService,Callback } from '../service/cognito.service';
import { LoginService } from '../service/login.service';
//import { jwtHelper } from 'angular-jwt.jwt';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-securehome',
  templateUrl: './securehome.component.html',
  styleUrls: ['./securehome.component.css']
})
export class SecurehomeComponent implements OnInit,LoggedInCallback,Callback {

  constructor( public router: Router, public loginservice:LoginService ) { 
  		this.loginservice.isAuthenticated(this);
      console.log("kkkk");
      this.loginservice.getGroup(this);
  }

  show:boolean = false;

  ngOnInit() {
  }

  getCallDetails(){
    console.log("Inside the get call details");
  }

  logout(){
    this.loginservice.logout();
    this.router.navigate(['login']);
  }

  isLoggedIn(message: string, loggedIn: boolean){
  	console.log(message);
  		if(!loggedIn){
  			this.router.navigate(['login']);
  		}
  }

  callback(){
    console.log("Error on getting the jwttoken");
  }

  callbackWithParam(result:any){
    //console.log("aa");
    //console.log(result);
    //console.log(jwt_decode(result)['cognito:groups'][0]);
    if(jwt_decode(result)['cognito:groups']!==undefined &&jwt_decode(result)['cognito:groups'][0] == 'admin'){
      this.show = true;
    }

  }

}
