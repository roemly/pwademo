import {Component, OnInit} from '@angular/core';
import {Post} from '../../class/Post';
import {PostService} from '../../service/post.service';
import {Router} from '@angular/router';
import {LoginService} from '../../service/login.service';
import {OrderService} from "../../service/order.service";
import {OrderDetail} from "../../class/OrderDetail";
import {Order} from "../../class/Order";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls:  ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit{
  ngOnInit(): void{
    if(this.posts.posts == null){
      this.posts.fetchdata().subscribe(data => {
            // console.log('in');
            // this.posts.posts = data;
            // const result: Post[] = [];
            // data.forEach(d => {
            //   result.push(new Post(d.title, d.content, d.created_at));
            // })
            this.posts.posts = data;
            // console.log(data);
            //this.posts.posts.sort((n1,n2) => (Date.parse(n1.created_at) > Date.parse(n2.created_at)) ? -1 : 1);
            // console.log(this.posts.posts);

            // console.log(typeof data[0].created_at);
        });
    }

  }
  constructor(private posts: PostService, private router: Router, private login: LoginService, private orderDetail: OrderService){
    if (!login.isLogin()) {
     // console.log('Login');
    //  console.log(localStorage.user);
      this.router.navigate(['login']);
    }

    // console.log('const');
   }
}

