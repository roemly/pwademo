import { Injectable } from '@angular/core';
import {Product} from '../class/Product';
import {PRODUCTS} from './product-data';

@Injectable()
export class ProductService {
  products: Product[] = null;
  constructor() { }

  getProduct(): Product[] {
    if (this.products) {
      return this.products;
    }
    const data = PRODUCTS;
    this.products = data;
    return data;
  }

  getProductByCategory(category: string): Product[] {
    if (this.products) {
      return this.products.filter(item => item.category === category);
    }
    const data = PRODUCTS;
    this.products = data;
    return data.filter(item => item.category === category);
  }

  getProductById(id: number): Product{
    return this.products.find(item => item.id === id);
  }

}
