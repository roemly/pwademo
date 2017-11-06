import {Injectable, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import {Cart} from '../class/Cart';
import {Product} from '../class/Product';
import {ItemCart} from '../class/ItemCart';
import {ProductService} from "./product.service";
import {isNumber} from "util";

@Injectable()
export class CartService implements OnInit {
  private _cart: Cart;
  private _alamatTujuan: string = '';
  private _catatan: string = '';
  private _isPajak: boolean = false;
  private _isAgree: boolean = false;
  // private thisObject: CartService = null;

  constructor(public login: LoginService,
              public products: ProductService) {
    this._cart = new Cart();
    if(localStorage.items !== undefined) {
      console.log('items kepanggil?');
      // this._cart.setitem((JSON.parse(localStorage.items) as ItemCart[]));
      // let itemProd = JSON.parse(localStorage.items, function (key, value){
      //     console.log(isNumber(value) + ' - ' + key + ' = ' + value);
      //     if(key == '_id') return this.products.getProductById(value);
      //     // if(key == '_id') return products.getProductById(value);
      // }) as Product;
      // let itemQty = JSON.parse(localStorage.items, function (key, value){
      //   console.log(isNumber(value) + ' - ' + key + ' = ' + value);
      //   // if(key == '_id') return itemProd.push(this.products.getProductById(value));
      //   if(key == '_qty') return value;
      //   // if(key == '_id') return products.getProductById(value);
      // });
      let a = JSON.parse(localStorage.items) as ItemCart[];
      // console.log(itemProd);
      // console.log(itemQty);
      console.log(a[0]['_qty']);
    }
    if(localStorage.alamatTujuan !== undefined) {
        console.log('address kepanggil?');
      this._alamatTujuan = (JSON.parse(localStorage.alamatTujuan) as string);
    }
    if(localStorage.pajak !== undefined) {
        console.log('pajak kepanggil?');
      this._isPajak = (JSON.parse(localStorage.pajak) as boolean);
    }
    if(localStorage.agree !== undefined) {
        console.log('agree kepanggil?');
      this._isAgree = (JSON.parse(localStorage.agree) as boolean);
    }
    // if(localStorage.cart !== undefined){
    //     // this.thisObject = (JSON.parse(localStorage.cart) as CartService);
    //     this._cart = (JSON.parse(localStorage.cart) as CartService).getCart();
    //     this._alamatTujuan = (JSON.parse(localStorage.cart) as CartService).getAlamatTujuan();
    //     this._isPajak = (JSON.parse(localStorage.cart) as CartService).getPajak();
    //     this._isAgree = (JSON.parse(localStorage.cart) as CartService).getAgree();
    // }
  }

  removeProduct(prod: Product): void{
    this._cart.removeProduct(prod);
  }

  getCart(): Cart {
    return this._cart;
  }

  setCart(_cart: Cart = null): void {
    this._cart = _cart;
  }

  addProduct(product: Product, qty: number): boolean {
    return this._cart.addProduct(product, qty);
  }
  getItems(): ItemCart[]{
    return this._cart.item;
  }
  getTotal(): number {
    let result = 0;
    this._cart.item.forEach(i => {
      result += i.qty * i.price;
    });
    return result;
  }
  getAlamatTujuan(): string {
    return this._alamatTujuan;
  }
  setAlamatTujuan(tujuan: string = ''): void {
    this._alamatTujuan = tujuan;
  }
  getCatatan(): string {
    return this._catatan;
  }
  setCatatan(catatan: string = ''): void {
    this._catatan = catatan;
  }
  getPajak(): boolean {
      return this._isPajak;
  }
  setPajak(isPajak: boolean = false): void {
      this._isPajak = isPajak;
  }
  getAgree(): boolean {
      return this._isAgree;
  }
  setAgree(isAgree: boolean = false): void {
      this._isAgree = isAgree;
  }

  ngOnInit(): void {
    if (this.login.isLogin()) {
      //call a cart from database idk
    }
  }
}
