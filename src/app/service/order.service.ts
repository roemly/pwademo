import { Injectable } from '@angular/core';
import {Order} from "../class/Order";
// import {ORDERS} from "./order-data";
import {LoginService} from './login.service';
import {Observable} from "rxjs/Observable";
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class OrderService {
  orderlist: Order[] = null;
    constructor(
        private login: LoginService,
        private http: Http
        ) {
    }

    getorderlist(): Order[] {
        if (this.orderlist == null){
            this.fetchdata().subscribe(data =>{
                console.log(data);
                this.orderlist = data;
            });
        }
        return this.orderlist;
    }

    getByStatus(status: string): Order[] {
        if(this.orderlist != null){
            this.orderlist.sort((n1,n2) => (Date.parse(n1.created_at) > Date.parse(n2.created_at)) ? -1 : 1);
            return this.orderlist.filter(item => {
                // console.log('item',item);
                if(item.status == status){
                    return item;
                }
            });
            // return this.orderlist;
        }
    }
    getById(id: any): Order {
        return this.getorderlist().find(item => item.id === id);
    }
    fetchdata(): Observable<Order[]> {
        return this.http.get('https://pwa.aindo.com/shop/api/api-order-history.php?member_id='+this.login.getUserCurrent().id)
            .map((res: Response) => <Order[]>res.json());
    }
}
