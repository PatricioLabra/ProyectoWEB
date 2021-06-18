import { Component, OnInit } from '@angular/core';
import { Product } from '@models/product.model';
import { CategoryTypes } from '@models/category-types';
import { ApiConnectionService } from '@services/api-connection.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Array<Product> = [];
  movies: Array<Product> = [];
  music: Array<Product> = [];
  clothes: Array<Product> = [];
  food: Array<Product> = [];

  constructor(private api: ApiConnectionService) { }

  ngOnInit(): void {
    this.api.getNewerProducts(0, 10).subscribe((data: any) => {
      this.products = data.products;
      this.movies = this.products.filter((product: Product) => product.category == CategoryTypes.MOVIES);
      this.music = this.products.filter((product: Product) => product.category == CategoryTypes.MUSIC);
      this.clothes = this.products.filter((product: Product) => product.category == CategoryTypes.CLOTHES);
      this.food = this.products.filter((product: Product) => product.category == CategoryTypes.FOOD);
    });
  }
}
