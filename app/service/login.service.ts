import { Injectable } from '@angular/core';
import { CognitoCallback,CognitoService,LoggedInCallback,Callback } from './cognito.service';
import { CognitoUser,AuthenticationDetails }  from "amazon-cognito-identity-js";

import * as AWS from "aws-sdk/global";


@Injectable()
export class LoginService {

  constructor(public cognitoservice:CognitoService) { }

  authenticate(username: number, password: string,callback:CognitoCallback){
  	console.log(" lets start AWS Cognito ");

  	console.log("Succesfully retrieved the username = "+username);
  	console.log("Succesfully retrieved the password = "+password);

  	let authenticationData = {
            Username: username.toString(),
            Password: password,
	};

	let authenticationDetails = new AuthenticationDetails(authenticationData);

	let userData = {
		Username: username.toString(),
		Pool:this.cognitoservice.getUserPool()
	};

	let cognitouser = new CognitoUser(userData);

	console.log("fully connected ");
	console.log("UserLoginService: config is " + AWS.config);

	cognitouser.authenticateUser(authenticationDetails,{
		newPasswordRequired: (userAttributes, requiredAttributes) => callback.cognitoCallback("user needs to set the password",null),
		onSuccess:result =>callback.cognitoCallback(null,null),
		onFailure: err =>callback.cognitoCallback("Not Authorized please contact system admin",null),
	}
	);


  }

  isAuthenticated(callback: LoggedInCallback){
  		 let cognitoUser = this.cognitoservice.getCurrentUser();
		
		if(cognitoUser!=null){
				cognitoUser.getSession(function (err, session){
					if(err){
						console.log("could not get the user session");
						callback.isLoggedIn(err,false);
					}
					else{
						console.log("UserLoginService Session "+session.isValid());
						//console.log("a");
						//console.log(session.getIdToken().payload['cognito:groups']);
						//session.getIdToken().payload['cognito:groups']
					}
				});

		} else{
			callback.isLoggedIn("Can't retrieve the CurrentUser", false);
		}	 

  }

  logout(){
  	this.cognitoservice.getCurrentUser().signOut();
  }

  getGroup(callback: Callback){
  	this.cognitoservice.getAccessToken(callback);
  }

}
