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
  currentSkip: number = 0;
  currentQuantity: number = 9;
  quantityProducts: number = 0;
  textSearched: string = '';
  currentFilter: FilterType;

  constructor(private api: ApiConnectionService, private route: ActivatedRoute) {
    this.currentFilter = {
      text_index: '',
      category: '',
      subcategories: [],
      lower_limit: null,
      upper_limit: null
    };
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((newQueryParams: any) => {
      this.textSearched = newQueryParams.text || '';
      this.currentFilter.text_index = newQueryParams.text || '';
      this.currentFilter.category = newQueryParams.category || '';
      this.currentFilter.lower_limit = newQueryParams.lower_limit || null;
      this.currentFilter.upper_limit = newQueryParams.upper_limit || null;
      this.currentFilter.subcategories = newQueryParams.subcategories || [];
      console.log(this.currentFilter);

      this.filterProducts();
    });
  }

  /**
   * Obtiene productos usando el filtro ingresado
   * @param filter Filtro que se aplicara a los productos para buscarlos
   */
  filterProducts() {
    const filter = this.currentFilter;
    console.log(filter);

    this.api.getFilteredProducts(filter, this.currentSkip, this.currentQuantity).subscribe((data: any) => {
      console.log(data);
      this.products = data.products;
      this.quantityProducts = data.quantityProducts;
      this.currentSkip = 0;
    });
  }

  nextPage() {
    if ((this.currentSkip + this.currentQuantity) < this.quantityProducts) {
      this.currentSkip += this.currentQuantity;
      this.filterProducts();
    }
  }

  prevPage() {
    if ((this.currentSkip - this.currentQuantity) >= 0) {
      this.currentSkip -= this.currentQuantity;
      this.filterProducts();
    }
  }
}
