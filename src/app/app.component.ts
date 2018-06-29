import { Component } from '@angular/core';
import {SubscriptionService} from "./service/subcription.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private subService: SubscriptionService){
  }
  unSub(): void{
    this.subService.unsubscribeUser();
  }
 
  
}
