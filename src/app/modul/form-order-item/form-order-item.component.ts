import 'rxjs/add/operator/switchMap';
import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {ProductService} from '../../service/product.service';
import {Product} from '../../class/Product';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {CartService} from '../../service/cart.service';
import {MatSnackBar} from "@angular/material";
import { Location } from '@angular/common';
import {Cart} from "../../class/Cart";
import {ItemCart} from "../../class/ItemCart";
import "rxjs/add/operator/startWith";
import {forEach} from "@angular/router/src/utils/collection";
import { CloseScrollStrategy } from '@angular/cdk/overlay/typings/scroll/close-scroll-strategy';
import { LoginService } from '../../service/login.service';

@Component({
  templateUrl: './form-order-item.component.html',
  styleUrls: ['./form-order-item.component.css'],
  selector: 'app-form-order-item',
})
export class FormOrderItemComponent implements OnInit {
  id_order: number;
  isAdd: boolean;
  id_temp:number = -1;
  qty:number = 0;
  myControl: FormControl = new FormControl();
  options = [];
  products: Product[];
  filteredOptions: any;
  title: string = '';
  r: Product[] = [];
  kelipatan: number = 1;

  ngOnInit(): void {
    let result: Product[] = [];
    let i: number = 0;

      this.products = this.product.getProduct();

      this.filteredOptions = this.myControl.valueChanges
          .startWith(null)
          .map(val => {
           // console.log(typeof(this.users.getUserCurrent()));
            console.log(JSON.parse(localStorage.user).id);
              this.product.fetchDataWithKey(val, String(this.users.getUserCurrent().id), this.id_order).subscribe(data => {
                  this.options = data.map(p => {
                      return {
                          label: String(p.name),
                          sublabel: String(p.description),
                          val: String(p.id),
                          data : p
                      };
                  });
              });
              if(val instanceof Object){
                  console.log('catch' + JSON.stringify(val));
                  this.qty = 0;
                  this.kelipatan = val.data.kelipatan;

                  console.log(this.kelipatan);
              }
              return this.options;
          });

  }

    constructor(public route: ActivatedRoute,
                public product: ProductService,
                public cart: CartService,
                public snackBar: MatSnackBar,
                public router: Router,
                public location: Location,
                private users : LoginService) {
        this.route.params.subscribe(params => {
            this.id_order = +params['id']; // (+) converts string 'id' to a number
        });
        console.log(this.kelipatan)
        if(this.id_order == 1) this.title = 'SIKA';
        else if(this.id_order == 2) this.title = 'MAKITA';
        else if(this.id_order == 3) this.title = 'LAKONI';
    }
    stepUp(): void{
        this.qty += Number(this.kelipatan);
    }
    stepDown(): void{
      if(this.qty- this.kelipatan >= 0){
          this.qty -= this.kelipatan;
      }
    }
  NumberKeyboard(s: String) {
    if (s === 'delete') {
      this.qty = Math.floor(this.qty / 10);
    } else {
      this.qty = parseInt(String(this.qty) + s, 10);
    }
  }
  getTotal (): number{

    if (this.myControl.value instanceof Object){
        // console.log(this.myControl.value.data);
        // this.qty = 0;
        return this.qty * this.myControl.value.data.price;
    }
    return 0;
  }
  filter(val: any): string[] {
    if (typeof (val) !== 'string'){
      console.log('val: ', val);
      val = val.label;
    }
    // let temp =

    return this.options.filter(option =>
        option.label.indexOf(val.toLowerCase()) > -1 || option.sublabel.indexOf(val.toLowerCase()) > -1
    );
    // return this.options.filter(option =>
    //   option.label.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  display(option: any): string{
    // console.log('option: ', option);
    // console.log('olabel: ', option !== null ? option.label : null);
    return option ? option.label : option;
  }
  addToCart(): void{
    this.isAdd = this.cart.addProduct(this.myControl.value.data as Product, this.qty);
    if(this.isAdd) {
      localStorage.items = JSON.stringify(this.cart.getItems());
      this.location.back();
    }
    else this.snackBar.open('Produk sudah ada dikeranjang', '', {duration: 1500});
  }
}
