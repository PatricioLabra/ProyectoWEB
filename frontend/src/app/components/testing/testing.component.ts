import { Component, OnInit } from '@angular/core';
import { Product } from '@models/product.model';
import { ApiConnectionService } from '@services/api-connection.service';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent implements OnInit {

  products: Array<Product> = [];
  movies: Array<Product> = [];
  music: Array<Product> = [];

  constructor(private api: ApiConnectionService) { }

  ngOnInit(): void {
    this.api.getNewerProducts(0, 10).subscribe((data: any) => {
      this.products = data.products;
      this.movies = this.products.filter((product: Product) => product.category == 'Películas');
      this.music = this.products.filter((product: Product) => product.category == 'Música');
    });
  }
}
