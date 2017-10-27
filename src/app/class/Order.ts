import {OrderDetail} from "./OrderDetail";

export class Order{
  user_id: number;
  id: number;
  total_price: number=0;
  detail: OrderDetail[];
  status: string;
  created_at: Date;

    constructor(id: number,user_id: number,status: string,  detail: OrderDetail[], created_at: Date) {
        this.user_id = user_id;
        this.id = id;
        this.detail = detail;
        this.status=status;
        this.created_at=created_at;
        this.getTotal();
    }
    getTotal () : number{
      this.total_price = 0;
      this.detail.forEach(item => {
        this.total_price += item.product.price * item.qty;
      })
        return this.total_price;
    }
}
