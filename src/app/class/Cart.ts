import {ItemCart} from './ItemCart';
import {Product} from './Product';

export class Cart {
  private _item: ItemCart[] = new Array<ItemCart>();

  constructor() {
  }

  addProduct(product: Product, qty: number): void {
    const icTemp = this._item.find(d => {
      return d.id === product.id;
    });
    if (icTemp !== undefined) {
      alert('Item sudah ada di cart!');
    } else {
      this._item.push(new ItemCart(
        product.id,
        qty,
        product.price
      ));
    }
  }

  get item(): ItemCart[] {
    return this._item;
  }

  removeProduct(product: Product): void {
    this._item.splice(this._item.findIndex(i => i.id === product.id), 1);
  }
}
