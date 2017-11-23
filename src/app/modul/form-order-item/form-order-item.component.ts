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
<<<<<<< HEAD
              this.product.fetchDataWithKey(val).subscribe(data => {
=======
              // console.log('qty: ', this.qty);
              // if (val) {
              //     let temp = this.filter(val);
              //     // console.log('filter: ', temp);
              //     // console.log('temp',temp.length);
              //     let filternow = [];
              //     if(temp.length > 10){
              //         for(let i = 0; i < 10; i++)
              //             filternow[i] = temp[i];
              //     }
              //     else filternow = temp;
              //     console.log('filternow', filternow.length);
              //     return filternow;
              //
              // }
              // else {
              //     // console.log('slice: ', this.options.slice());
              //     // console.log('options',this.options.length);
              //     let filternow = [];
              //     if(this.options.length > 10){
              //         for(let i = 0; i < 10; i++)
              //             filternow[i] = this.options[i];
              //     }
              //     else filternow = this.options;
              //     // console.log('filternow',filternow.length);
              //     return filternow.slice();
              // }

              this.product.fetchDataWithKey(val,JSON.parse(localStorage.user).id ,this.id_order).subscribe(data => {
>>>>>>> 5694a42a0defb89893844858f8e57a5c76b6827f
                  this.options = data.map(p => {
                      return {
                          label: String(p.name),
                          sublabel: String(p.description),
                          val: String(p.id)
                      };
                  });
              });
              console.log(val);
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
<<<<<<< HEAD
=======
        else if(this.id_order == 3) this.title = 'LAKONI';
        
        // this.options = this.products.map(product => {
        //     return {
        //         label: product.name,
        //         sublabel: product.description,
        //         val: String(product.id)
        //     };
        // });
        console.log(this.product.getProduct());
>>>>>>> 5694a42a0defb89893844858f8e57a5c76b6827f
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
    if( !id  || !this.products || this.products.find(item => item.id == id) == null) {
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
    console.log(value);
    console.log(this.product.getProductById(value));
    this.isAdd = this.cart.addProduct(this.product.getProductById(value), this.qty);

    if(this.isAdd) {
      // console.log('yang ini?');
      // this.snackBar.open('Produk berhasil ditambah', '', {duration: 1500});
      localStorage.items = JSON.stringify(this.cart.getItems());
      this.location.back();
    }
    else this.snackBar.open('Produk sudah ada dikeranjang', '', {duration: 1500});
  }
}
