import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {LoginService} from '../../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:  ['./login.component.css']
})

export class LoginComponent {
  email= '';
  pass= '';
  message = 'test';
  constructor(
      public router: Router,
      public users: LoginService
  ){}

  onClick (){
        console.log();
      this.users.attempt(this.email, this.pass).then(t => {
        if(t._body === "[]"){
            this.message = 'username atau password salah!';
        }else {
            this.router.navigate(['dashboard']);
        }
      });
  }
}
