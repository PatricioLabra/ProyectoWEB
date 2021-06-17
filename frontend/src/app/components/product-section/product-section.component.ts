import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@models/product.model';

@Component({
  selector: 'app-product-section',
  templateUrl: './product-section.component.html',
  styleUrls: ['./product-section.component.scss']
})
export class ProductSectionComponent implements OnInit {

  _id: string;
  product: Product = new Product();

  constructor(private activeRoute: ActivatedRoute, private http: HttpClient) {
    this._id = this.activeRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.http.get('http://localhost:4000/product/' + this._id).subscribe((data: any) => {
      this.product = data.product;
    });
  }
}
