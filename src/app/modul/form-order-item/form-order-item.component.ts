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
  filteredOptions: Observable<string[]>;
  title: string = '';
  r: Product[] = [];

  ngOnInit(): void {
    let result: Product[] = [];
    let i: number = 0;
    // this.product.fetchdata().subscribe(
    //     (data) => {
    //       if(this.r.length > 0) result = [];
    //       else{
    //           // for (let i = 0; i < 20000; i++){
    //           //     this.r.push(new Product(i, 'title' + i, 'desc' + i, i, i, (i % 2 == 0) ? 'sika':'makita'));
    //           // }
    //           // result = this.r;
    //           // console.log(this.r);
    //           console.log(data);
    //           data.forEach(d => {
    //               i = i + 1;
    //               result.push(new Product(i, 'title' + i, 'desc' + i, i, i, (i % 2 == 0) ? 'sika':'makita'));
    //           });
    //       }
    //
    //       // result = result.filter(item => item.category === (this.id_order ==1?'sika':'makita'));
    //       // this.product.products = result;
    //       this.product.products = this.r;
    //       this.products = this.product.getProductByCategory(this.id_order ==1?'sika':'makita');
    //       console.log('products: ',this.products);
    //       this.options = this.products.map(p => {
    //               return {
    //                   label: p.name,
    //                   sublabel: p.description,
    //                   val: String(p.id)
    //               };
    //           });
    //       this.filteredOptions = this.myControl.valueChanges
    //           .startWith(null)
    //           .map(val => {
    //               console.log('qty: ', this.qty);
    //               if (val) {
    //                   let temp = this.filter(val);
    //                   console.log('filter: ', temp);
    //                   console.log('temp',temp.length);
    //                   let filternow = [];
    //                   if(temp.length > 10){
    //                       for(let i = 0; i < 10; i++)
    //                           filternow[i] = temp[i];
    //                   }
    //                   else filternow = temp;
    //                   console.log('filternow',filternow.length);
    //                   return filternow;
    //
    //               }
    //               else {
    //                   console.log('slice: ', this.options.slice());
    //                   console.log('options',this.options.length);
    //                   let filternow = [];
    //                   if(this.options.length > 10){
    //                       for(let i = 0; i < 10; i++)
    //                           filternow[i] = this.options[i];
    //                   }
    //                   else filternow = this.options;
    //                   console.log('filternow',filternow.length);
    //                   return filternow.slice();
    //               }
    //           });
    //       // console.log(this.product.products);
    //     }
    // );
    //   if(this.product.products == null) console.log('form order null');
    //   this.product.fetchdata1().subscribe(
    //       data => {
    //           // console.log(typeof data);
    //           if(this.product.products == null || this.product.category != this.title){
    //               console.log('form order');
    //               this.product.products = data.filter(item => item.category === this.title.toLowerCase());
    //               // console.log(this.title);
    //               // console.log(this.product.category);
    //           }
    //       }
    //   );
      this.products = this.product.getProduct();
      this.options = this.products.map(p => {
          return {
              label: String(p.name),
              sublabel: String(p.description),
              val: String(p.id)
          };
      });
      this.filteredOptions = this.myControl.valueChanges
          .startWith(null)
          .map(val => {
              console.log('qty: ', this.qty);
              if (val) {
                  let temp = this.filter(val);
                  // console.log('filter: ', temp);
                  // console.log('temp',temp.length);
                  let filternow = [];
                  if(temp.length > 10){
                      for(let i = 0; i < 10; i++)
                          filternow[i] = temp[i];
                  }
                  else filternow = temp;
                  console.log('filternow',filternow.length);
                  return filternow;

              }
              else {
                  // console.log('slice: ', this.options.slice());
                  // console.log('options',this.options.length);
                  let filternow = [];
                  if(this.options.length > 10){
                      for(let i = 0; i < 10; i++)
                          filternow[i] = this.options[i];
                  }
                  else filternow = this.options;
                  // console.log('filternow',filternow.length);
                  return filternow.slice();
              }
          });
    // this.filteredOptions = this.myControl.valueChanges
    //     .startWith(null)
    //     .map(val => val ? this.filter(val) : this.options.slice());

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
    if(id === null || id === undefined || this.products.find(item => item.id == id) == null) {
        // console.log('this id');
        return 0;
    }
    // console.log('that id',this.products.find(item => item.id == id) == null);
    return this.qty * this.products.find(item => item.id == id).price;
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
    let value;
    if (typeof(this.myControl.value) === 'string' ){
      value = parseInt(this.myControl.value);
    } else {
      value = parseInt(this.myControl.value.val);
    }
    if(value == 0){
        this.snackBar.open('Produk yang dibeli tidak boleh nol', '', {duration: 1500});
        return;
    }
    this.isAdd = this.cart.addProduct(this.products.find(item => {
     return item.id === value;
    }), this.qty);

    if(this.isAdd) {
      // console.log('yang ini?');
      // this.snackBar.open('Produk berhasil ditambah', '', {duration: 1500});
      localStorage.items = JSON.stringify(this.cart.getItems());
      this.location.back();
    }
    else this.snackBar.open('Produk sudah ada dikeranjang', '', {duration: 1500});
  }
}
