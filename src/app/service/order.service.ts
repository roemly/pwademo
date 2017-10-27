import { Injectable } from '@angular/core';
import {Order} from "../class/Order";
import {ORDERS} from "./order-data";

@Injectable()
export class OrderService {
  orderlist: Order[] = null;

  constructor() {this.getorderlist() }

  getorderlist():Order[]{
    if(!this.orderlist){
        this.orderlist = ORDERS;

    }
    return this.orderlist;
  }
  getByStatus(status : string): Order[]{
    return this.orderlist.filter(item => {
      return item.status === status;
    });
  }
}
