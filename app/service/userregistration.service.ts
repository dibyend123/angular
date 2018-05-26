import { Injectable } from '@angular/core';
import { CognitoCallback,CognitoService } from './cognito.service';
import { CognitoUser,AuthenticationDetails }  from "amazon-cognito-identity-js";
import { NewPasswordUser } from '../new-password/new-password.component';


import * as AWS from "aws-sdk/global";

@Injectable()
export class UserregistrationService {

  constructor(public cognitoservice:CognitoService) { }

  newpassword(registeruser:NewPasswordUser,callback:CognitoCallback){

  console.log("kkk"+registeruser.username);

  	
  	let authenticationData = {
            Username: registeruser.username,
            Password: registeruser.existingPassword,
	};

	let authenticationDetails = new AuthenticationDetails(authenticationData);

    let userData = {
            Username: registeruser.username,
            Pool: this.cognitoservice.getUserPool()
	};

	let cognitoUser = new CognitoUser(userData);

	cognitoUser.authenticateUser(authenticationDetails,{


		newPasswordRequired: function (userAttributes, requiredAttributes) {

				console.log('newpassword required');
				//userAttributes.Username = registeruser.username;
				//userAttributes.Password = registeruser.password;

				userAttributes.name = registeruser.username;
				delete userAttributes.email_verified;
				delete userAttributes.phone_number_verified;
                cognitoUser.completeNewPasswordChallenge(registeruser.password, userAttributes, {
                    onSuccess: function (result) {

                    	console.log('ssss');
                        callback.cognitoCallback(null, userAttributes);
                    },
                    onFailure: function (err) {
                    console.log('ffff');
                    callback.cognitoCallback(err.message, null);
                    }
                });
		},

		onSuccess: function (result) {
            callback.cognitoCallback(null, result);
            console.log('succesfull');
         },
        onFailure: function (err) {
            callback.cognitoCallback(err.message, null);
            console.log('failure'+err);
		}

	});

  }



}
