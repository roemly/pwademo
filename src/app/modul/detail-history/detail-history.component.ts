import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../service/order.service';
import {Order} from '../../class/Order';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-detail-history',
  templateUrl: './detail-history.component.html',
  styleUrls: ['./detail-history.component.css']
})
export class DetailHistoryComponent implements OnInit {
 public current_order: Order;

  constructor(public route: ActivatedRoute,
              public orders: OrderService) {
    this.route.params.subscribe(params => {
      this.current_order = this.orders.getById(params['id']); 
      console.log(this.current_order);
    });
  }

  ngOnInit() {
  }

}
