import { ProductCart } from "./product-cart.model";

export interface CartBought {
  nickname_buyer: string,
  productCart: Array<ProductCart>,
  date: Date
}
