export class Post{
  created_at : string;
  title: string;
  content: string;

  constructor(title: string, content: string, created_at: string){
    this.title = title;
    this.content = content;
    this.created_at = created_at;
  }

}
