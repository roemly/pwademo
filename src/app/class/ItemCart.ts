export class ItemCart {
  private _id: number;
  private _qty = 1;
  private _price: number;
  constructor(id: number, qty: number, price: number) {
    this._id = id;
    this._qty = qty;
    this._price = price;
  }
  addQty () {
    this._qty++;
  }
  resetQty () {
    this._qty = 0;
  }

  minQty () {
    this._qty--;
  }

  get id(): number {
    return this._id;
  }

  get qty(): number {
    return this._qty;
  }

  get price(): number {
    return this._price;
  }
}
