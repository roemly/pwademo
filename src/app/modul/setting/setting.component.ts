import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../../service/login.service";

@Component({
  templateUrl: './setting.component.html',
  styleUrls:  ['./setting.component.css'],
  selector: 'app-setting',
})
export class SettingComponent {
  nama:string = '';
  alamat:string ='';
  telp:string='';
  email:string='';

  constructor(private router:Router,
              private users:LoginService
              )
  {
      this.users.getUserData();
      this.nama=users.getUserCurrent().name;
      this.alamat=users.getUserCurrent().alamat;
      this.telp=users.getUserCurrent().telp;
      this.email=users.getUserCurrent().email;
  }

  onClickChange (){
      this.router.navigate(['changepassword']);
  }
  onClickLogout (){
      this.users.logout();
      this.router.navigate(['login']);
  }

}
