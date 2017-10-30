import 'rxjs/add/operator/switchMap';
import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {CartService} from '../../service/cart.service';
import {ProductService} from '../../service/product.service';
import {LoginService} from "../../service/login.service";
@Component({
  templateUrl: './form-order.component.html',
  styleUrls:  ['./form-order.component.css'],
  selector: 'app-form-order',
})
export class FormOrderComponent implements OnInit {
  id_order: Number;
  alamat_order: string = '';

  constructor(private route: ActivatedRoute,
              private cart: CartService,
              private product: ProductService,
              private  current_user: LoginService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id_order = Number(params['id']); // (+) converts string 'id' to a number
    });
    this.alamat_order = (this.cart.getAlamatTujuan() !== '') ? this.cart.getAlamatTujuan() : this.current_user.getUserCurrent().alamat;
  }
  onChangeAlamat(): void {
      this.cart.setAlamatTujuan(this.alamat_order);
  }
}
