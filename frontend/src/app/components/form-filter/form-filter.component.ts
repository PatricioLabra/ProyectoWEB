import { Component, OnInit } from '@angular/core';
import { CategoryList, Subcategories } from '@models/category-types';

@Component({
  selector: 'app-form-filter',
  templateUrl: './form-filter.component.html',
  styleUrls: ['./form-filter.component.scss']
})
export class FormFilterComponent implements OnInit {

  CategoryList = CategoryList;
  Subcategories = Subcategories;

  constructor() {
  }

  ngOnInit(): void {
  }

}
