import { Component } from '@angular/core';
import { ProductCart } from '@models/product-cart.model';
import { CartService } from '@services/cart.service';
import { Cart } from '@models/cart.class';

@Component({
  selector: 'app-cart-section',
  templateUrl: './cart-section.component.html',
  styleUrls: ['./cart-section.component.scss']
})
export class CartSectionComponent extends Cart {

  totalDiscount: number = 0;

  constructor(cart: CartService) {
    super(cart);
    this.cart.currentDataCart$.subscribe(this.handleCartChange);
  }

  /**
   * Actualiza los productos del carro, el precio final y el precio total descontado
   * @param listProducts Lista de los productos del carrito
   */
  handleCartChange = (listProducts: Array<ProductCart>) => {
    this.products = listProducts;
    this.totalPrice = this.products.reduce((total: number, product: ProductCart) => total + product.finalPrice, 0);
    this.totalDiscount = this.products.reduce((total: number, product: ProductCart) => total + (product.price * product.discount), 0);
  };

  buyCart() {

  }
}
