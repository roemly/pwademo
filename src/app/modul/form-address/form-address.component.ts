import { Component, OnInit} from '@angular/core';
import {LoginService} from "../../service/login.service";
import {ProductService} from "../../service/product.service";
import {CartService} from "../../service/cart.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-form-address',
  templateUrl: './form-address.component.html',
  styleUrls: ['./form-address.component.css']
})
export class FormAddressComponent implements OnInit {
  alamat_order: string = '';
  isPajak: boolean;
  isAgree: boolean;
  constructor(private route: ActivatedRoute,
              private cart: CartService,
              private product: ProductService,
              private  current_user: LoginService) { }

  ngOnInit() {
    if(this.cart.getAlamatTujuan() == ''){
      if(this.current_user.getUserCurrent().alamat != '') this.cart.setAlamatTujuan(this.current_user.getUserCurrent().alamat);
    }
    this.alamat_order = this.cart.getAlamatTujuan();
    this.isPajak = this.cart.getPajak();
    this.isAgree = this.cart.getAgree();
  }
  onChangeAlamat(): void {
    this.cart.setAlamatTujuan(this.alamat_order);
  }
  onClickPajak(): void {
    this.cart.setPajak(this.isPajak);
  }
  onClickAgree(): void {
    this.cart.setAgree(this.isAgree);
  }
}
