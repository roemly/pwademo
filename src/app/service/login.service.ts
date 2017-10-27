import { Injectable } from '@angular/core';
import {User} from '../class/User';
import {USERS} from "./user-data";
import {getResponseURL} from "@angular/http/src/http_utils";

@Injectable()
export class LoginService {
  user: User = null;
  constructor() { }

  attempt (username: string, password: string): Boolean {
    //call an api to authenticate
    let user = this.getUser();
    for( let i = 0; i < user.length; i++){
      if(user[i].email == username && user[i].token == password) {
        this.user=user[i];
        return true;
      }
    }
    return false;
  }

  isLogin(): Boolean {
    return this.user !== null;
  }

  getUser():User[]{
    return USERS;
  }
}
