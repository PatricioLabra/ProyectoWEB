import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryList, Subcategories } from '@models/category-types';
import { FilterType } from '@models/filter.model';

@Component({
  selector: 'app-form-filter',
  templateUrl: './form-filter.component.html',
  styleUrls: ['./form-filter.component.scss']
})
export class FormFilterComponent {

  CategoryList = CategoryList;
  Subcategories = Subcategories;
  SubcategoriesChecked: Array<string> = [];

  filterForm: FormGroup;

  constructor(private _fb: FormBuilder, private router: Router) {
    this.filterForm = this._fb.group({
      category: [''],
      minPrice: [],
      maxPrice: []
    });
  }

  onSubmit() {
    let { category, minPrice, maxPrice } = this.filterForm.getRawValue();

    minPrice = (null == minPrice) ? minPrice : parseInt(minPrice);
    maxPrice = (null == maxPrice) ? maxPrice : parseInt(maxPrice);

    const data: FilterType = {
      text_index: '',
      category,
      lower_limit: minPrice,
      upper_limit: maxPrice,
      subcategories: this.SubcategoriesChecked
    }

    this.router.navigate(['search'], {queryParams: data});
  }

  /**
   * Va guardando las subcategorias seleccionadas
   * @param subcategory Subcategoria seleccionada (o deseleccionada)
   */
  onChange(subcategory: string) {
    const index = this.SubcategoriesChecked.findIndex((sub: string) => sub == subcategory);

    if (index != -1) {
      // Si la subcategoria ya estaba, significa que se deselecciono, por lo tanto se saca
      this.SubcategoriesChecked.splice(index, 1);
    } else {
      // Sino estaba, significa que se selecciono, por lo tanto se ingresa
      this.SubcategoriesChecked.push(subcategory);
    }
  }
}
