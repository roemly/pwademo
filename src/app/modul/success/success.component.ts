import { Component, OnInit } from '@angular/core';
import {CartService} from "../../service/cart.service";
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-testing',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
alamat_tujuan: any= '';
catatan: any= '';
isPajak: any= false;
isAgree: any= false;
  constructor( private cart: CartService) { }

  ngOnInit() {
    this.alamat_tujuan = this.cart.getAlamatTujuan();
    this.catatan = this.cart.getCatatan();
    this.isPajak = this.cart.getPajak();
    this.isAgree = this.cart.getAgree();

    console.log(this.alamat_tujuan);
  }

}
