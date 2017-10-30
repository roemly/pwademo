import {Injectable, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import {Cart} from '../class/Cart';
import {Product} from '../class/Product';
import {ItemCart} from '../class/ItemCart';

@Injectable()
export class CartService implements OnInit {
  private _cart: Cart;
  private _alamatTujuan: string = '';

  constructor(private login: LoginService) {
    this._cart = new Cart();
  }

  addProduct(product: Product, qty: number): void {
    this._cart.addProduct(product, qty);
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

  ngOnInit(): void {
    if (this.login.isLogin()) {
      //call a cart from database idk
    }
  }
}
