import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../service/login.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent {

  oldpass = '';
  newpass = '';
  repass = '';

  constructor(
      public router: Router,
      public users: LoginService,
      public snackBar: MatSnackBar
  ) { }

  onClickChange() {
      if (this.newpass != this.repass){
          this.repass = '';
          this.newpass = '';
          this.snackBar.open('ketik kembali password baru', 'X', {duration: 1500});
      }else{
          this.users.changePassword(this.oldpass,  this.newpass)
              .then(response => {
                 console.log(response);
                 let status =JSON.parse((<any>response)._body).status,msg;
                 if(status === 'FAILED'){
                       msg = JSON.parse((<any>response)._body).msg;
                 }else {
                     msg = "berhasil merubah password!";
                 }
                  this.snackBar.open(msg, 'X', {duration: 1500});
              });
      }
  }
}
