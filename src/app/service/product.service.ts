import { Injectable } from '@angular/core';
import {Product} from '../class/Product';
import {PRODUCTS} from './product-data';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';

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
  category: string = '';
  
  constructor(private http: Http) {
    // this.getProduct1().then(value => {
    //     this.products = value;
    // });
    //   if(this.databaseProducts == null)
    //     this.fetchdata1().subscribe(data => this.databaseProducts = data);
  }

  getProduct(): Product[] {
    if (this.products) {
      return this.products;
    }
    // const data = _products;
    // this.products = data;
    //   const data = [];
    // this.getProduct1().then(value => {
    //   this.products = value;
    //   console.log(this.products);
    // });
    // this.products = data;
    // console.log(this.products);
    // return data;
    // const result: Product[] = [];
    // let i: number = 0;
    this.fetchdata1().subscribe(
        (data) => {
          // data.forEach(d => {
          //     i = i + 1;
          //     result.push(new Product(i, 'title' + i, 'desc' + i, i, i, (i % 2 == 0) ? 'sika':'makita'));
          // });
          this.products = data;
            console.log("get ");
            console.log(this.products);
          return this.products;
        }
    );
  }

    // fetchdata() {
    //     //ganti link data yang mau diambil dari server disini
    //     return this.http.get('https://falsesilver.me/fiesto/public/api/post-all')
    //     // return this.http.get(this.api_catalog_data_url)
    //         .map((res) => res.json());
    // }

    fetchdata1(): Observable<Product[]> {
        //ganti link data yang mau diambil dari server disini
        return this.http.get('assets/dummy-product.json')
        // return this.http.get(this.api_catalog_data_url)
            .map((res: Response) => <Product[]>res.json());
        //.do(data => console.log(JSON.stringify(data)));
    }
    fetchDataWithKey(key : string): Observable<Product[]> {
        //ganti link data yang mau diambil dari server disini
        return this.http.get('http://fsretail.tk/fiesto/public/api/product-by-key?key=' + key + '&limit=10')
        // return this.http.get(this.api_catalog_data_url)
            .map((res: Response) => <Product[]>res.json());
        //.do(data => console.log(JSON.stringify(data)));
    }

  // fetchdata1(){
  //     const result: Product[] = [];
  //     let i: number = 0;
  //     this.http.get('https://falsesilver.me/fiesto/public/api/post-all')
  //         .map((res) => res.json()).subscribe(
  //         (data) => {
  //             data.forEach(d => {
  //                 i = i + 1;
  //                 result.push(new Product(i, 'title' + i, 'desc' + i, i, i, (i % 2 == 0) ? 'sika':'makita'));
  //             });
  //             this.products = result;
  //         }
  //     );
  // }

  getProductByCategory(category: string): Product[] {
    
    if (this.products) {
      return this.products.filter(item => item.category === category);
    }
    // const data = PRODUCTS;
    // this.products = data;
    // const result: Product[] = [];
    // let i: number = 0;
    this.fetchdata1().subscribe(
        (data) => {
            // data.forEach(d => {
            //     i = i + 1;
            //     result.push(new Product(i, 'title' + i, 'desc' + i, i, i, (i % 2 == 0) ? 'sika':'makita'));
            // });
            this.products = data.filter(item => item.category === category);
            return this.products;
        }
    );
    // const data = this.fetchdata().then(function(value) {
    //     return value;
    // };
    // return this.products.filter(item => item.category === category);
    
    
    // return this.http
    // .post(this.api_catalog_data_url, JSON.stringify({cat_id: category}), {headers: this.headers})
    // .toPromise()
    // .then(response => response.json().data as Product[])
    // .catch();
    
    
   }

  getProductById(id: number): Product{
    return (this.products != null) ? this.products.find(item => item.id === id) : null;
  }
}
