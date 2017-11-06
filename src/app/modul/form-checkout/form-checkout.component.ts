import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../service/login.service";
import {ProductService} from "../../service/product.service";
import {CartService} from "../../service/cart.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-form-checkout',
  templateUrl: './form-checkout.component.html',
  styleUrls: ['./form-checkout.component.css']
})
export class FormCheckoutComponent implements OnInit {
  alamat_tujuan: string = '';
  catatan: string ='';
  isPajak = false;
  isAgree = false;
  constructor(public route: ActivatedRoute,
              public cart: CartService,
              public product: ProductService,
              public  current_user: LoginService) { }

  ngOnInit(): void {
      this.alamat_tujuan = this.cart.getAlamatTujuan();
      this.catatan = this.cart.getCatatan();
      this.isPajak = this.cart.getPajak();
      this.isAgree = this.cart.getAgree();
  }

}
