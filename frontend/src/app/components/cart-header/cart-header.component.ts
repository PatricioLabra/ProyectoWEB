import { Component } from '@angular/core';
import { CartService } from '@services/cart.service';
import { Cart } from '@models/cart.class';

@Component({
  selector: 'app-cart-header',
  templateUrl: './cart-header.component.html',
  styleUrls: ['./cart-header.component.scss']
})
export class CartHeaderComponent extends Cart {

  constructor(cart: CartService) {
    super(cart);
  }
}
