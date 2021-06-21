import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterType } from '@models/filter.model';
import { Product } from '@models/product.model';
import { ApiConnectionService } from '@services/api-connection.service';

@Component({
  selector: 'app-searched-products-section',
  templateUrl: './searched-products-section.component.html',
  styleUrls: ['./searched-products-section.component.scss']
})
export class SearchedProductsSectionComponent implements OnInit {

  products: Array<Product> = [];
  textSearched: string = '';
  currentSkip: number = 0;
  currentQuantity: number = 9;
  quantityProducts: number = 0;

  constructor(private api: ApiConnectionService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((newQueryParams: any) => {
      this.textSearched = newQueryParams.text;

      this.updateSearchedProducts();
    });
  }

  /**
   * Obtiene los productos relacionados con la busqueda
   */
  updateSearchedProducts() {
    this.api.getSearchProducts(this.textSearched, this.currentSkip, this.currentQuantity).subscribe((data: any) => {
      console.log(data);
      console.log(this.currentSkip);
      console.log(this.currentQuantity);
      this.products = data.products;
      this.quantityProducts = data.quantityProducts;
    });
  }

  /**
   * Obtiene productos usando el filtro ingresado
   * @param filter Filtro que se aplicara a los productos para buscarlos
   */
  filterProducts(filter: FilterType) {
    filter.text_index = this.textSearched;
    console.log(filter);

    this.api.getFilteredProducts(filter, this.currentSkip, this.currentQuantity).subscribe((data: any) => {
      console.log(data);
      this.products = data.products;
      this.quantityProducts = data.quantityProducts;
    });
  }

  nextPage() {
    if ((this.currentSkip + this.currentQuantity) < this.quantityProducts) {
      this.currentSkip += this.currentQuantity;
      this.updateSearchedProducts();
    }
  }

  prevPage() {
    if ((this.currentSkip - this.currentQuantity) >= 0) {
      this.currentSkip -= this.currentQuantity;
      this.updateSearchedProducts();
    }
  }
}
