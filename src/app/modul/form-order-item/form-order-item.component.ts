import 'rxjs/add/operator/switchMap';
import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {ProductService} from '../../service/product.service';
import {Product} from '../../class/Product';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import {CartService} from '../../service/cart.service';
import {MatSnackBar} from "@angular/material";
import { Location } from '@angular/common';
import {Cart} from "../../class/Cart";
import {ItemCart} from "../../class/ItemCart";

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
  filteredOptions: Observable<string[]>;
  title: string = '';

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges
      .startWith(null)
      .map(val => val ? this.filter(val) : this.options.slice());

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
        
        this.products = product.getProductByCategory(this.id_order ==1?'sika':'makita');
        if(this.id_order == 1) this.title = 'SIKA';
        else if(this.id_order == 2) this.title = 'MAKITA';
        //this.product.getProductByCategory(this.id_order ==1?'sika':'makita').then(
        //  res => {
        //    this.products=res;
        //  }
        //)
        

        this.options = this.products.map(product => {
            return {
                label: product.name,
                sublabel: product.description,
                val: String(product.id)
            };
        });
    }

  NumberKeyboard(s: String) {
    if (s === 'delete') {
      this.qty = Math.floor(this.qty / 10);
    } else {
      this.qty = parseInt(String(this.qty) + s, 10);
    }
  }
  getTotal (): number{
    if (this.myControl.value === null){
      return 0;
    }
    let id:number;
    if (!isNaN(parseFloat(this.myControl.value)) && isFinite(this.myControl.value)) {
      id = parseInt(this.myControl.value);
    } else if(typeof(this.myControl.value) === 'object'){
      id = this.myControl.value.val;
    } else{
      id = null;
    }
    if(id === null || id === undefined) return 0;
    return this.qty * this.products.find(item => item.id == id).price;
  }
  filter(val: any): string[] {
    if (typeof (val) !== 'string'){
      val = val.label;
    }
    return this.options.filter(option =>
      option.label.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }
  display(option: any): string{

    return option ? option.label : option;
  }
  addToCart(): void{
    let value;
    if (typeof(this.myControl.value) === 'string' ){
      value = parseInt(this.myControl.value);
    } else {
      value = parseInt(this.myControl.value.val);
    }
    this.isAdd = this.cart.addProduct(this.products.find(item => {
     return item.id === value;
    }), this.qty);

    if(this.isAdd) {
      console.log('yang ini?');
      // this.snackBar.open('Produk berhasil ditambah', '', {duration: 1500});
      localStorage.items = JSON.stringify(this.cart.getItems());
      this.location.back();
    }
    else this.snackBar.open('Produk sudah ada dikeranjang', '', {duration: 1500});
  }
}
