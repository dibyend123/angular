import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

	export interface CognitoCallback{
		cognitoCallback(message:string,result:any):void;

	}

  export interface LoggedInCallback {
    isLoggedIn(message: string, loggedIn: boolean): void;
  }

  export interface Callback{
    callback():void;
    callbackWithParam(result:any):void;
  }

@Injectable()
export class CognitoService {

	public static _REGION = environment.region;
	public static _USER_POOL_ID = environment.userPoolId;
	public static _CLIENT_ID = environment.clientId;


  constructor() { }

  public static _POOL_DATA:any = {
  		UserPoolId:CognitoService._USER_POOL_ID,
  		ClientId: CognitoService._CLIENT_ID
  };

  getUserPool(){
  	return new CognitoUserPool(CognitoService._POOL_DATA);
  }

  getCurrentUser() {
        return this.getUserPool().getCurrentUser();
  }

  getAccessToken(callback:Callback){

    if(this.getCurrentUser()!=null){
        this.getCurrentUser().getSession(function(err,session){

            if(err){
              callback.callbackWithParam(null);
            }else{
              if(session.isValid()){
                  callback.callbackWithParam(session.getIdToken().getJwtToken());
              }
            }
        });
        }
    }

  


}
