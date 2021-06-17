import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCart } from '@models/product-cart.model';
import { Product } from '@models/product.model';
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
    private http: HttpClient,
    private cart: CartService,
  ) {
    this._id = this.activeRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.http.get('http://localhost:4000/product/' + this._id).subscribe((data: any) => {
      this.product = data.product;
      this.productCart = new ProductCart(this.product);
    });
  }

  insertCart(): void {
    this.cart.insertProduct(this.productCart);
  }

  removeCart(): void {
    this.cart.removeProduct(this.productCart);
  }
}
