import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  searchInput: FormControl;

  constructor(private _fb: FormBuilder, private router: Router) {
    this.searchInput = this._fb.control('');
  }

  ngOnInit(): void {
  }

  searchProducts() {
    const input: string = this.searchInput.value;

    if (input != '')
      this.router.navigate(['search'], { queryParams: { text: input } });
  }
}
