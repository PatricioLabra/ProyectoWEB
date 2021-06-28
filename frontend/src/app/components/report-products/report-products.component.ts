import { Component, OnInit } from '@angular/core';
import { CartBought } from '@models/cart-bought.model';
import { ApiConnectionService } from '@services/api-connection.service';
import { UserInfoService } from '@services/user-info.service';

@Component({
  selector: 'app-report-products',
  templateUrl: './report-products.component.html',
  styleUrls: ['./report-products.component.scss']
})
export class ReportProductsComponent implements OnInit {

  carts: Array<CartBought> = [];
  quantityCarts: number = 0;

  constructor(private api: ApiConnectionService, private user: UserInfoService) {
  }

  ngOnInit(): void {
    this.api.getNewerCarts(this.user.token, 0, 10).subscribe((res: any) => {
      this.carts = res.carts;
      this.quantityCarts = res.quantityCarts;
      console.log(res);
    });
  }

}
