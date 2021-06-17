import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from '@models/product.model';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent implements OnInit {

  products: Array<Product> = [];
  movies: Array<Product> = [];
  music: Array<Product> = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:4000/products/newer/0/10').subscribe((data: any) => {
      this.products = data.products;
      this.movies = this.products.filter((product: Product) => product.category == 'Películas');
      this.music = this.products.filter((product: Product) => product.category == 'Música');
    });
  }
}
