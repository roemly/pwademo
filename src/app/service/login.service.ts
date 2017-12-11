import { Injectable } from '@angular/core';
import {User} from '../class/User';
import {USERS} from './user-data';
import {getResponseURL} from '@angular/http/src/http_utils';
import {Http} from '@angular/http';

@Injectable()
export class LoginService {
  private user: User = null;
  private url = 'http://ptamp.aindo.com/api/api-login.php';
  private message = '';
  constructor(private http: Http) {
    if (localStorage.user !== undefined){
      this.user = JSON.parse(localStorage.user) as User;
    }
  }
  setMessage(msg: string): void{
    this.message = msg;
  }
  getMessage(): string{
    let temp = this.message;
    this.message = '';
    return temp;
  }
  attempt (username: string, password: string): any {
    //call an api to authenticate
    let flag = false,finish = false;
    let result = this.http.post(this.url, {username : username, password: password}).toPromise();
    return Promise.resolve(result);
  }
  refreshData(): void {
    this.user = JSON.parse(localStorage.user) as User;
  }

  changePassword (new_password: string) {
      this.user.token = new_password;
      localStorage.user = JSON.stringify(this.user);
  }
  getUserCurrent(): User {
    return this.user;
  }
  isLogin(): Boolean {
    return this.user !== null;
  }

  logout(): void {
    localStorage.user = null;
    this.user = null;
  }
  getUserData(): void {
      console.log(this.user.name);
      console.log(this.user.alamat);
      console.log(this.user.email);
      console.log(this.user.telp);
  }
}
