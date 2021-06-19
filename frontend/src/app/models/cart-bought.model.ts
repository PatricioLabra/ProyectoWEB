import { ProductCart } from "./product-cart.model";

export class CartBought {
  nickname_buyer: string;
  productCart: Array<ProductCart>;
  date: Date;

  constructor() {
    this.nickname_buyer = '';
    this.productCart = [];
    this.date = new Date;
  }
}
