import {Component, OnInit} from '@angular/core';
import {OrderDetail} from '../../class/OrderDetail';
import {OrderService} from '../../service/order.service';
import {Router} from '@angular/router';
import {LoginService} from '../../service/login.service';

@Component({
  templateUrl: './history.component.html',
  styleUrls:  ['./history.component.css'],
  selector: 'app-history',
})
export class HistoryComponent implements OnInit{
  title = 'History';
  ngOnInit(): void {
    //
        // console.log('null');
        this.orderDetail.fetchdata().subscribe(data => {
            this.orderDetail.orderlist = data.filter(item => {
                if(this.login.getUserCurrent().id == item.user_id){
                    console.log(item);
                    return item;
                }
            });
        });
   // }
  }
  constructor(
      public orderDetail: OrderService,
      private router: Router,
      private login: LoginService
  ){
    if (!login.isLogin()) {
      this.router.navigate(['login']);
    }
  }
}
