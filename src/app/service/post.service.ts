import { Injectable } from '@angular/core';
import {Post} from '../class/Post';
// import {Posts} from './post-data';
import {Observable} from "rxjs/Observable";
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class PostService {
  posts: Post[] = null;
  constructor(private http: Http) { }
  getPost(): Post[]{
    if (this.posts !== null) {
      // console.log('i');
      return this.posts;
    }
    // return null;
    // this.fetchdata().subscribe(data => {
    //   this.posts = data;
    //   console.log('a');
    //   return this.posts;
    // });
    // let data = Posts;
    // this.posts = data;
    // return data;
  }
  fetchdata(): Observable<Post[]> {
    return this.http.get('https://pwa.aindo.com/shop/api/api-news.php')
        .map((res: Response) => <Post[]>res.json());
        // .do(data => console.log(JSON.stringify(data)));
  }
}
