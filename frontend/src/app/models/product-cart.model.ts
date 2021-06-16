import { Product } from "./product.model";

export class ProductCart {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  discount: number;
  image_url: string;
  stock: number;
  finalPrice:number;

  constructor(product: Product, quantity: number = 0) {
    this._id = product._id;
    this.name = product.name;
    this.image_url = product.images_urls[0];
    this.price = product.price;
    this.discount = product.discount;
    this.quantity = quantity;
    this.stock = product.stock;
    this.finalPrice = this.getFinalPrice();
  }

  /**
   * @returns True si tiene disponibilidad el producto, false en caso contrario
   */
  hasDisponibility(): boolean {
    return this.stock > this.quantity;
  }

  /**
   * @returns Precio de un producto, aplicando el descuento
   */
  getUnitPriceWithDiscount(): number {
    return (this.price * (1 - this.discount));
  }

  /**
   * @returns Precio total del producto (precio con descuento * cantidad)
   */
  getFinalPrice(): number {
    return this.getUnitPriceWithDiscount() * this.quantity;
  }
}
