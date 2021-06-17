import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '@models/product.model';
import { Categorytypes } from '@models/category-types';

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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:4000/products/newer/0/10').subscribe((data: any) => {
      this.products = data.products;
      this.movies = this.products.filter((product: Product) => product.category == Categorytypes.MOVIES);
      this.music = this.products.filter((product: Product) => product.category == Categorytypes.MUSIC);
      this.clothes = this.products.filter((product: Product) => product.category == Categorytypes.CLOTHES);
      this.food = this.products.filter((product: Product) => product.category == Categorytypes.FOOD);
      console.log(this.food);
    });
  }
}
