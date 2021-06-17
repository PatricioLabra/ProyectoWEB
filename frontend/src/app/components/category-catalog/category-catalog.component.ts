import { Component, Input } from '@angular/core';
import { Product } from '@models/product.model';

@Component({
  selector: 'app-category-catalog',
  templateUrl: './category-catalog.component.html',
  styleUrls: ['./category-catalog.component.scss']
})
export class CategoryCatalogComponent {

  @Input()
  products: Array<Product> = [];

  @Input()
  categoryName: string = '';

  constructor() { }
}
