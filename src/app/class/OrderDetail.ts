import {Product} from "./Product";

export class OrderDetail{
  product: Product;
  qty:number;
    constructor(product: Product, qty: number) {
        this.product = product;
        this.qty = qty;
    }
}
