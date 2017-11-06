import { Injectable } from '@angular/core';
import {Post} from '../class/Post';
import {Posts} from './post-data';

@Injectable()
export class PostService {
  posts: Post[] = null;
  constructor() { }
  getPost(): Post[]{
    if (this.posts !== null) {
      return this.posts;
    }
    let data = Posts;
    this.posts = data;
    return data;
  }
}
