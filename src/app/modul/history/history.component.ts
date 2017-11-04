import { Component } from '@angular/core';
import {OrderDetail} from '../../class/OrderDetail';
import {OrderService} from '../../service/order.service';
import {Router} from '@angular/router';
import {LoginService} from '../../service/login.service';

@Component({
  templateUrl: './history.component.html',
  styleUrls:  ['./history.component.css'],
  selector: 'app-history',
})
export class HistoryComponent {
  title = 'History';

  constructor(
      private orderDetail: OrderService,
      private router: Router,
      private login: LoginService
  ){
    if (!login.isLogin()) {
      this.router.navigate(['login']);
    }
  }
}
