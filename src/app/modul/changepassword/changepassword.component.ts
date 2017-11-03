import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../service/login.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent {

  oldpass: string = '';
  newpass: string = '';
  repass: string = '';

  constructor(
      public router:Router,
      public users:LoginService,
      public snackBar: MatSnackBar
  ) { }

  onClickChange() {
      if(this.newpass != this.users.getUserCurrent().token && this.newpass == this.repass && this.oldpass == this.users.getUserCurrent().token){
          this.users.changePassword(this.newpass);
          this.oldpass='';
          this.newpass='';
          this.repass='';
          this.snackBar.open('password berhasil diubah', 'X', {duration: 1500});
      }
      else if(this.oldpass != this.users.getUserCurrent().token){
          this.oldpass='';
          this.snackBar.open('password lama salah', 'X', {duration: 1500});
      }
      else if(this.newpass == this.users.getUserCurrent().token){
          this.newpass='';
          this.snackBar.open('password baru sama dengan password lama', 'X', {duration: 1500});
      }
      else if(this.newpass != this.repass){
          this.repass='';
          this.snackBar.open('ketik kembali password baru', 'X', {duration: 1500});
      }
  }
}
