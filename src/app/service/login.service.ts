import { Injectable } from '@angular/core';
import {User} from '../class/User';

@Injectable()
export class LoginService {
  user: User = null;
  constructor() { }

  attempt (username: string, password: string): Boolean {
    //call an api to authenticate
    return true;
  }

  isLogin(): Boolean {
    return this.user !== null;
  }
}
