import { Component } from '@angular/core';
import {SubscriptionService} from "./service/subcription.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(subService: SubscriptionService){

  }
  unSub() :void{
    this.subService.unsubscribeUser();
  }
  Sub ():void {
    this.subService.subscribeUser();
  }
}
