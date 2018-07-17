import 'rxjs/add/operator/switchMap';
import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {CartService} from '../../service/cart.service';
import {ProductService} from '../../service/product.service';
import {LoginService} from '../../service/login.service';
import {MatSnackBar} from '@angular/material';
import {Cart} from '../../class/Cart';
import {ItemCart} from '../../class/ItemCart';
@Component({
  templateUrl: './form-order.component.html',
  styleUrls:  ['./form-order.component.css'],
  selector: 'app-form-order',
})
export class FormOrderComponent implements OnInit {
  id_order: Number;
  title: string = '';
  constructor(public route: ActivatedRoute,
              public cart: CartService,
              public product: ProductService,
              public  current_user: LoginService,
              public snackBar: MatSnackBar) {}
    
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id_order = Number(params['id']); // (+) converts string 'id' to a number
    });
    if(this.id_order == 1) this.title = 'CAT 1';
    else if(this.id_order == 2) this.title = 'CAT 2';
    else if(this.id_order == 3) this.title = 'CAT 3';
    else if(this.id_order == 4) this.title = 'CAT 4';
    this.cart.title = this.title.toLowerCase();
    // this.cart.refreshdata();
    console.log('now',this.cart.title);
  }
  onClickDelete(id: number){
    const prodId = this.cart.getItems().find(d => {
        return (d.id === id);
    });
    if(prodId != undefined){
        this.cart.removeProduct(this.product.getProductById(id));
        this.snackBar.open('Produk berhasil dihapus', '', {duration: 1500});
        localStorage.items = JSON.stringify(this.cart.getItems());
    }
    else this.snackBar.open('Tidak ada produk yang bisa dihapus', '', {duration: 1500});
  }
}