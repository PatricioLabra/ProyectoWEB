import { Component } from '@angular/core';
import { CategoryList, Subcategories } from '@models/category-types';

@Component({
  selector: 'app-form-filter',
  templateUrl: './form-filter.component.html',
  styleUrls: ['./form-filter.component.scss']
})
export class FormFilterComponent {

  CategoryList = CategoryList;
  Subcategories = Subcategories;

  constructor() {
  }

  filterProducts() {

  }
}
