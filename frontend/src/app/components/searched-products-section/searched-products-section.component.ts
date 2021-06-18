import { Component, OnInit } from '@angular/core';
import { Product } from '@models/product.model';
import { ApiConnectionService } from '@services/api-connection.service';

@Component({
  selector: 'app-searched-products-section',
  templateUrl: './searched-products-section.component.html',
  styleUrls: ['./searched-products-section.component.scss']
})
export class SearchedProductsSectionComponent implements OnInit {

  products: Array<Product> = [];

  constructor(private api: ApiConnectionService) { }

  ngOnInit(): void {
    this.api.getNewerProducts(0, 10).subscribe((data: any) => {
      this.products = data.products;
    });
  }
}
