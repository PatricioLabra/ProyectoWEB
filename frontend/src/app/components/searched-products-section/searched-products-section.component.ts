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
    this.api.getSearchProducts(this.textSearched).subscribe((data: any) => {
      this.products = data.products;
    });
  }

  /**
   * Obtiene productos usando el filtro ingresado
   * @param filter Filtro que se aplicara a los productos para buscarlos
   */
  filterProducts(filter: FilterType) {
    filter.text = this.textSearched;

    this.api.getFilteredProducts(filter).subscribe((data: any) => {
      this.products = data.products;
    });
  }
}
