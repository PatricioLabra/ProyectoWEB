import { Component, OnInit, Input } from '@angular/core';
import { Product } from '@models/product.model';

@Component({
  selector: 'app-product-section',
  templateUrl: './product-section.component.html',
  styleUrls: ['./product-section.component.scss']
})
export class ProductSectionComponent implements OnInit {

  @Input()
  product: Product = new Product();

  constructor() { }

  ngOnInit(): void {
  }

}
