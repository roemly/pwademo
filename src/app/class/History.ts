import {ItemCart} from './ItemCart';
import {Product} from './Product';

export class History {
  private _item: ItemCart[] = new Array<ItemCart>();
  private _idNota: string = '';
  private _total: number = 0;
  private _status: string = '';
  private _waktu: string = '';

  constructor() {

  }
}
