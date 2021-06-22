import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartHeaderComponent } from '@components/cart-header/cart-header.component';
import { UserInfoService } from '@services/user-info.service';
import { CategoryList } from '@models/category-types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  CategoryTypes = CategoryList;

  constructor(private userInfo: UserInfoService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  get isLogged() {
    return this.userInfo.isLogged;
  }

  get isAdmin() {
    return this.userInfo.isAdmin;
  }

  get nickname() {
    return this.userInfo.userInfo.nickname;
  }

  public openDialog() {
    this.dialog.open(CartHeaderComponent, {
      width: '50vw',
      maxHeight: '90vh',
      data: null,   // The data is get from service
    });
  }

  signout() {

  }
}
