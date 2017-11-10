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
    const result: Product[] = [];
    let i: number = 0;
    this.product.fetchdata().subscribe(
        (data) => {
          data.forEach(d => {
              i = i + 1;
              result.push(new Product(i, 'title' + i, 'desc' + i, i, i, (i % 2 == 0) ? 'sika':'makita'));
          });
          // result = result.filter(item => item.category === (this.id_order ==1?'sika':'makita'));
          this.product.products = result;
          this.products = this.product.getProductByCategory(this.id_order ==1?'sika':'makita');
          console.log(this.products);
          this.options = this.products.map(p => {
                  return {
                      label: p.name,
                      sublabel: p.description,
                      val: String(p.id)
                  };
              });
          this.filteredOptions = this.myControl.valueChanges
              .startWith(null)
              .map(val => val ? this.filter(val) : this.options.slice());
          // console.log(this.product.products);
        }
    );
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
        // console.log('b');
        // this.products = product.getProductByCategory(this.id_order ==1?'sika':'makita');

        // this.options = this.products.map(product => {
        //     console.log('product in map: ',product);
        //     return {
        //         label: product.name,
        //         sublabel: product.description,
        //         val: String(product.id)
        //     };
        // });

        // this.product.getProductByCategory(this.id_order ==1?'sika':'makita').then(
        //     res => {
        //         this.products=res;
        //     }
        // )
        if(this.id_order == 1) this.title = 'SIKA';
        else if(this.id_order == 2) this.title = 'MAKITA';

        // this.options = this.products.map(product => {
        //     return {
        //         label: product.name,
        //         sublabel: product.description,
        //         val: String(product.id)
        //     };
        // });

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
    console.log('val before: ', val);
    if (typeof (val) !== 'string'){
      val = val.label;
      // console.log('val before: ', val.label);
    }
    console.log('val after: ', val);
    console.log('products: ', this.product.products);
    // const temp = [];
    // this.options.forEach(d => {
    //     if(d.label.contains(val) || d.sublabel.contains(val)) temp.push(d);
    // });
    return this.options.filter(option =>
        option.label.toLowerCase().indexOf(val.toLowerCase()) === 0 || option.sublabel.toLowerCase().indexOf(val.toLowerCase()) === 0);
    // return this.options.filter(option =>
    //   option.label.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }
  // doingfilter(value, index, arr){
  //   return arr.fin
  // }
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
