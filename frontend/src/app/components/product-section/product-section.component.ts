import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCart } from '@models/product-cart.model';
import { Product } from '@models/product.model';
import { ApiConnectionService } from '@services/api-connection.service';
import { CartService } from '@services/cart.service';

@Component({
  selector: 'app-product-section',
  templateUrl: './product-section.component.html',
  styleUrls: ['./product-section.component.scss']
})
export class ProductSectionComponent implements OnInit {

  _id: string;
  product: Product = new Product();
  productCart: ProductCart = new ProductCart(this.product);

  constructor(
    private activeRoute: ActivatedRoute,
    private api: ApiConnectionService,
    private cart: CartService,
  ) {
    this._id = this.activeRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.api.getProduct(this._id).subscribe((data: any) => {
      this.product = data.product;
      this.productCart = new ProductCart(this.product, 1);
    });
  }

  insertCart(): void {
    this.cart.insertProduct(this.productCart);
    console.log(this.productCart);
  }

  removeCart(): void {
    this.cart.removeProduct(this.productCart);
    console.log(this.productCart);
  }
}
