import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {LoginService} from "../../service/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:  ['./login.component.css']
})

export class LoginComponent {
  email='';
  pass='';
  message: string = 'test';
  constructor(
      public router:Router,
      public users:LoginService
  ){}

  onClick (){

      if (this.users.attempt(this.email, this.pass))
        this.router.navigate(['dashboard']);
      else{
        this.message = 'Username atau password salah!';
      }
  }
}
