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

@Component({
  templateUrl: './form-order-item.component.html',
  styleUrls: ['./form-order-item.component.css'],
  selector: 'app-form-order-item',
})
export class FormOrderItemComponent implements OnInit {
  id_order: number;
  isAdd: boolean;
  id_temp:number = -1;
  qty = 0;
  myControl: FormControl = new FormControl();
  options = [];
  products: Product[];
  filteredOptions: any;
  title: string = '';
  r: Product[] = [];

  ngOnInit(): void {
    let result: Product[] = [];
    let i: number = 0;

      this.products = this.product.getProduct();

      this.filteredOptions = this.myControl.valueChanges
          .startWith(null)
          .map(val => {
              this.product.fetchDataWithKey(val, JSON.parse(localStorage.user).id, this.id_order).subscribe(data => {
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
                  console.log('catch' + val);
              }
              return this.options;
          });

  }

    constructor(public route: ActivatedRoute,
                public product: ProductService,
                public cart: CartService,
                public snackBar: MatSnackBar,
                public router: Router,
                public location: Location) {
        this.route.params.subscribe(params => {
            this.id_order = +params['id']; // (+) converts string 'id' to a number
        });

        if(this.id_order == 1) this.title = 'SIKA';
        else if(this.id_order == 2) this.title = 'MAKITA';
        else if(this.id_order == 3) this.title = 'LAKONI';
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
