import { Component, Inject } from '@angular/core';
import { CartService } from '@services/cart.service';
import { Cart } from '@models/cart.class';
import { ProductCart } from '@models/product-cart.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-header',
  templateUrl: './cart-header.component.html',
  styleUrls: ['./cart-header.component.scss']
})
export class CartHeaderComponent extends Cart {

  constructor(
    cart: CartService,
    private router: Router,
    public dialogRef: MatDialogRef<CartHeaderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: null
  ) {
    super(cart);
    this.cart.currentDataCart$.subscribe(this.handleCartChange);
  }

  public redirectToCartPage() {
    this.router.navigate(['/cart']);
    this.dialogRef.close();
  }

  public redirectToProductPage(_id: string) {
    this.router.navigate(['/product', _id]);
    this.dialogRef.close();
  }

  /**
   * Actualiza los productos del carro, y el precio final
   * @param listProducts Lista de los productos del carrito
   */
  handleCartChange = (listProducts: Array<ProductCart>) => {
    this.products = listProducts;
    this.totalPrice = this.products.reduce((total: number, product: ProductCart) => total + product.getFinalPrice(), 0);
  };
}
