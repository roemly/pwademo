export class Product{
  id: number;
  private _name: string;
  private _description: string;
  private _category: string;
  private _qty: number = 0;
  private _price:number = 0;

  image: string = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg' ;
  constructor(id: number, name: string, description: string, qty: number, price: number,category: string, image: string = null) {
    this.id = id;
    this._name = name;
    this._qty = qty;
    this._price = price;
    this._description = description;
    this._category = category;
    if (image){
      this.image = image;
    }
  }
  get name(): string {
    return this._name;
  }

  get category(): string {
    return this._category;
  }

  get description(): string {
    return this._description;
  }

  get qty(): number {
    return this._qty;
  }

  get price(): number {
    return this._price;
  }
}
