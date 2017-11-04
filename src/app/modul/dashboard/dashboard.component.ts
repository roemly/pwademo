import { Component } from '@angular/core';
import {Post} from '../../class/Post';
import {PostService} from '../../service/post.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls:  ['./dashboard.component.css']
})

export class DashboardComponent {
  constructor(private posts: PostService){ }
}

