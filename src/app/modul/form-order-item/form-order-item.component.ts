import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  templateUrl: './form-order-item.component.html',
  styleUrls:  ['./form-order-item.component.css'],
  selector: 'app-form-order-item',
})
export class FormOrderItemComponent implements OnInit {
  id_order: Number;
  constructor(private route: ActivatedRoute) { }
    ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id_order = +params['id']; // (+) converts string 'id' to a number
    });
    }

}
