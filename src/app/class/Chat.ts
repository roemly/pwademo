export class Chat{
  sender:string;
  time:Date;
  content:string;

  constructor(sender:string, time:Date, content:string){
      this.sender=sender;
      this.time=time;
      this.content=content;
  }

}
