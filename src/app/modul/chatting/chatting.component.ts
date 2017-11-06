import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatting',
  templateUrl: './chatting.component.html',
  styleUrls: ['./chatting.component.css']
})
export class ChattingComponent {

  constructor() { }

  onClickSend() {
    console.log('sendchat');
  }
}
