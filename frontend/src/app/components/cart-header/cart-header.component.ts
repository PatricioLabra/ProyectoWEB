import { Component } from '@angular/core';
import { CartService } from '@services/cart.service';
import { Cart } from '@models/cart.class';
import { ProductCart } from '@models/product-cart.model';

@Component({
  selector: 'app-cart-header',
  templateUrl: './cart-header.component.html',
  styleUrls: ['./cart-header.component.scss']
})
export class CartHeaderComponent extends Cart {

  constructor(cart: CartService) {
    super(cart);
    this.cart.currentDataCart$.subscribe(this.handleCartChange);
  }

  handleCartChange = (listProducts: Array<ProductCart>) => {
    this.products = listProducts;
    this.totalPrice = this.products.reduce((total: number, product: ProductCart) => total + product.getFinalPrice(), 0);
  };
}
