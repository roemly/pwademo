import { Component } from '@angular/core';
import {OrderDetail} from "../../class/OrderDetail";
import {OrderService} from "../../service/order.service";

@Component({
  templateUrl: './history.component.html',
  styleUrls:  ['./history.component.css'],
  selector: 'app-history',
})
export class HistoryComponent {
  title = 'History';

  constructor(
      private orderDetail : OrderService
  ){}
}
