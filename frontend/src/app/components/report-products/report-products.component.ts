import { Component, OnInit } from '@angular/core';
import { CartBought } from '@models/cart-bought.model';
import { ApiConnectionService } from '@services/api-connection.service';

@Component({
  selector: 'app-report-products',
  templateUrl: './report-products.component.html',
  styleUrls: ['./report-products.component.scss']
})
export class ReportProductsComponent implements OnInit {

  carts: Array<CartBought> = [];
  quantityCarts: number = 0;

  constructor(private api: ApiConnectionService) {
  }

  ngOnInit(): void {
    this.api.getNewerCarts(0, 10).subscribe((res: any) => {
      this.carts = res.carts;
      this.quantityCarts = res.quantityCarts;
      console.log(res);
    });
  }

}
