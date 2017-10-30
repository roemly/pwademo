import { Injectable } from '@angular/core';
import {User} from '../class/User';
import {USERS} from "./user-data";
import {getResponseURL} from "@angular/http/src/http_utils";

@Injectable()
export class LoginService {
  private user: User = null;
  constructor() {
    if (localStorage.user !== undefined){
      this.user = JSON.parse(localStorage.user) as User;
    }
  }

  attempt (username: string, password: string): Boolean {
    //call an api to authenticate
    let user = this.getUser();
    for( let i = 0; i < user.length; i++){
      if(user[i].email == username && user[i].token == password) {
        this.user = user[i];
        localStorage.user = JSON.stringify(this.user);
        return true;
      }
    }
    return false;
  }
  getUserCurrent() : User {
    return this.user;
  }
  isLogin(): Boolean {
    return this.user !== null;
  }

  getUser():User[]{
    return USERS;
  }
}
