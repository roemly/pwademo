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
  message = '';
  constructor(
      public router: Router,
      public users: LoginService
  ){}

  onClick (){
        
      this.users.attempt(this.email, this.pass).then(t => {
        //console.log(t._body);

        if(t._body === "[]"){
            this.message = 'username atau password salah!';
        }else {
          console.log('berhasil');
          localStorage.user = JSON.stringify(t._body);
          this.router.navigate(['dashboard']);
        }
      });
  }
}
