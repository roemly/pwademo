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
  catatan_order: string = '';
  isPajak: boolean;
  isAgree: boolean;
  constructor(public route: ActivatedRoute,
              public cart: CartService,
              public product: ProductService,
              public  current_user: LoginService) { }

  ngOnInit() {
    if(this.cart.getAlamatTujuan() == ''){
      if(this.current_user.getUserCurrent().alamat != '') this.cart.setAlamatTujuan(this.current_user.getUserCurrent().alamat);
    }
    if(localStorage.alamatTujuan === undefined)localStorage.alamatTujuan = JSON.stringify(this.cart.getAlamatTujuan());
    if(localStorage.pajak === undefined)localStorage.pajak = JSON.stringify(this.cart.getPajak());
    this.alamat_order = this.cart.getAlamatTujuan();
    this.catatan_order= this.cart.getCatatan();
    this.isPajak = this.cart.getPajak();
    this.isAgree = this.cart.getAgree();
  }
  onChangeAlamat(): void {
    this.cart.setAlamatTujuan(this.alamat_order);
    localStorage.alamatTujuan = JSON.stringify(this.cart.getAlamatTujuan());
  }
  onChangeCatatan(): void {
    this.cart.setCatatan(this.catatan_order);
  }
  onClickPajak(): void {
    this.cart.setPajak(this.isPajak);
    localStorage.pajak = JSON.stringify(this.cart.getPajak());
  }
  // onClickAgree(): void {
  //   this.cart.setAgree(this.isAgree);
  //   localStorage.cart = JSON.stringify(this.cart);
  // }
}
