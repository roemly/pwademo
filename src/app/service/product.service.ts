import { Injectable } from '@angular/core';
import {Product} from '../class/Product';
import {PRODUCTS} from './product-data';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductService {
  
  //private api_catalog_data_url='http://ptamp.aindo.com/api-get-catalog.php';
  private api_catalog_data_url='http://localhost/webapps/pt-amp-api/api-get-catalog.php';
  private headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'http://localhost',
      'Access-Control-Allow-Credentials': true
});
  
  products: Product[] = null;
  
  constructor(private http: Http) {}

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
    
    
    // return this.http
    // .post(this.api_catalog_data_url, JSON.stringify({cat_id: category}), {headers: this.headers})
    // .toPromise()
    // .then(response => response.json().data as Product[])
    // .catch();
    
    
   }

  getProductById(id: number): Product{
    return this.products.find(item => item.id === id);
  }

}
