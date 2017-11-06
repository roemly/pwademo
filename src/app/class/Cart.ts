import {ItemCart} from './ItemCart';
import {Product} from './Product';
import { Location } from '@angular/common';

export class Cart {
  private _item: ItemCart[] = new Array<ItemCart>();
  private location: Location;
  constructor() {
  }

  addProduct(product: Product, qty: number): boolean {
    const icTemp = this._item.find(d => {
      return d.id === product.id;
    });
    if (icTemp !== undefined) {
      // alert('Item sudah ada di cart!');
      // this.location.back();
        return false;
    } else {
      this._item.push(new ItemCart(
        product.id,
        qty,
        product.price
      ));
        // this.location.back();
      return true;
    }
  }

  setitem(items: ItemCart[]): void {
    this._item = items;
  }

  get item(): ItemCart[] {
    return this._item;
  }

  removeProduct(product: Product): void {
    this._item.splice(this._item.findIndex(i => i.id === product.id), 1);
  }
}
