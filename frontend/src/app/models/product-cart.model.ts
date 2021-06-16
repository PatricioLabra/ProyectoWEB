import { Product } from "./product.model";

export class ProductCart {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  discount: number;
  image_url: string;
  stock: number;

  constructor(product: Product, quantity: number = 0) {
    this._id = product._id;
    this.name = product.name;
    this.image_url = product.images_urls[0];
    this.price = product.price;
    this.discount = product.discount;
    this.quantity = quantity;
    this.stock = product.stock;
  }

  hasDisponibility(): boolean {
    return this.stock > this.quantity;
  }
}
