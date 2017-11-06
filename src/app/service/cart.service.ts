import {Injectable, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import {Cart} from '../class/Cart';
import {Product} from '../class/Product';
import {ItemCart} from '../class/ItemCart';

@Injectable()
export class CartService implements OnInit {
  private _cart: Cart;
  private _alamatTujuan: string = '';
  private _catatan: string = '';
  private _isPajak: boolean = false;
  private _isAgree: boolean = false

  constructor(private login: LoginService) {
    this._cart = new Cart();
  }

  removeProduct(prod: Product): void{
    this._cart.removeProduct(prod);
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
