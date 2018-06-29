import {OrderDetail} from "./OrderDetail";

export class Order{
  user_id: number;
  id: number;
  total_price: number=0;
  detail: OrderDetail[];
  status: string;
  created_at: string;
  tax: string;
  kirim_ke: string;
  catatan: string;
  id_order: number;

    constructor(id: number,user_id: number,status: string,  detail: OrderDetail[], created_at: string,tax : string, kirim_ke : string, catatan : string , id_order : number) {
        this.user_id = user_id;
        this.id = id;
        this.detail = detail;
        this.status = status;
        this.created_at = created_at;
        this.tax= tax;
        this.kirim_ke= kirim_ke;
        this.catatan= catatan;
        this.id_order= id_order;
      
        console.log(id)
        this.getTotal();
    }
    getTotal () : number{
      console.log('test')
      this.total_price = 0;
      this.detail.forEach(item => {
        console.log(item.product.price * item.qty)
        this.total_price += item.product.price * item.qty;
      })
        return this.total_price;
    }
}
