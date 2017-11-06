import { Component } from '@angular/core';
import {Post} from '../../class/Post';
import {PostService} from '../../service/post.service';
import {Router} from '@angular/router';
import {LoginService} from '../../service/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls:  ['./dashboard.component.css']
})

export class DashboardComponent {
  constructor(private posts: PostService, private router: Router, private login: LoginService){
    if (!login.isLogin()) {
      this.router.navigate(['login']);
    }
   }
}

