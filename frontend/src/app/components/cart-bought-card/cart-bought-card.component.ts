import { Component, Input } from '@angular/core';
import { CartBought } from '@models/cart-bought.model';

@Component({
  selector: 'app-cart-bought-card',
  templateUrl: './cart-bought-card.component.html',
  styleUrls: ['./cart-bought-card.component.scss']
})
export class CartBoughtCardComponent {

  @Input()
  cart: CartBought = new CartBought;

  constructor() { }

}
