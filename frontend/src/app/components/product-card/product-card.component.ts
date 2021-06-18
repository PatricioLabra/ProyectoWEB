import { Component, Input } from '@angular/core';
import { ProductCart } from '@models/product-cart.model';
import { Product } from '@models/product.model';
import { CartService } from '@services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input()
  product: Product = new Product();

  constructor(private cart: CartService) {}

  insertCart() {
    this.cart.insertProduct(new ProductCart(this.product, 1));
  }
}
