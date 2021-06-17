import { Injectable } from '@angular/core';
import { ProductCart } from '@models/product-cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  products: Array<ProductCart> = [];

  constructor() { }

  insertProduct(product: ProductCart): boolean {
    const index: number = this.searchProduct(product);
    let itChanges: boolean = false;

    if (-1 == index) {
      this.products.push(product);
      itChanges = true;
    } else if (this.products[index].hasDisponibility()) {
      this.products[index].quantity++;
      itChanges = true;
    }

    console.log(this.products);
    return itChanges;
  }

  removeProduct(product: ProductCart): boolean {
    const index: number = this.searchProduct(product);
    let itChanges: boolean = false;

    if (index != -1) {
      this.products[index].decreaseQuantity(1);
      itChanges = true;

      if (this.products[index].quantity <= 0) {
        this.products.splice(index, 1);
      }
    }
    console.log(this.products);
    return itChanges;
  }

  searchProduct(product: ProductCart): number {
    return this.products.findIndex((productCart: ProductCart) => productCart._id == product._id);
  }
}
