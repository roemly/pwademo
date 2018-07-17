import {Injectable, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import {Cart} from '../class/Cart';
import {Product} from '../class/Product';
import {ItemCart} from '../class/ItemCart';
import {ProductService} from './product.service';
import {isNumber} from 'util';
import {Http} from '@angular/http';
import {toPromise} from 'rxjs/operator/toPromise';

@Injectable()
export class CartService implements OnInit {
  private _cart: Cart;
  private _alamatTujuan = '';
  private _catatan = '';
  private _isPajak = false;
  private _isAgree = false;
  public title = '';
  private url = 'https://pwa.aindo.com/shop/api/api-post-order.php';
  // private thisObject: CartService = null;

  constructor(public login: LoginService,
              public products: ProductService,
              public http: Http) {
    this._cart = new Cart();


    if (localStorage.alamatTujuan !== undefined && localStorage.alamatTujuan!=='' ) {
        // console.log('address kepanggil?');
      //this._alamatTujuan = (JSON.parse(localStorage.alamatTujuan) as string);
    }
    if (localStorage.pajak !== undefined) {
        // console.log('pajak kepanggil?');
      this._isPajak = (JSON.parse(localStorage.pajak) as boolean);
    }
    if (localStorage.agree !== undefined) {
        // console.log('agree kepanggil?');
      this._isAgree = (JSON.parse(localStorage.agree) as boolean);
    }
  }
  sendOrder(): any{
      const status = false;
      const result = this.http.post(this.url, {
              user : this.login.getUserCurrent(),
              cart : this._cart,
              address : this._alamatTujuan,
              note : this._catatan,
              tax : this._isPajak,
              aggrement : this._isAgree
  }).toPromise();
      return Promise.resolve(result);
  }

  refreshdata(): void{
      if (this.products.products == null || this.products.category != this.title){
          // console.log('cart',this.title);
          // console.log('product before',this.products.category);
          this.products.fetchdata1().subscribe(
              data => {
                  // console.log(this.title);
                  this.products.products = data.filter(item => item.category === this.title.toLowerCase());
                  if (localStorage.items !== undefined) {
                      // console.log('items kepanggil?');
                      for (const item of JSON.parse(localStorage.items) as ItemCart[]){
                          // console.log('find', this.product.getProduct());
                          const tempItem = data.find(_item => {
                              return _item.id === item['_id'];
                          });
                          console.log('tempitem', tempItem);
                          if (tempItem != null)
                              this._cart.addProduct(tempItem, item['_qty']);
                      }
                  }
                  // console.log('-----');

                  this.products.category = this.title;
                  // console.log('product after',this.products.category);
              }
          );
      }
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
      this.products.addProduct(product);
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
