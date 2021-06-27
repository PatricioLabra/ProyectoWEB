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
  isLogged: boolean = false;
  isAdmin: boolean = false;
  nickname: string = 'Visitant';

  constructor(private userInfo: UserInfoService, public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.userInfo.isLogged) {
      this.isLogged = this.userInfo.isLogged;
      this.isAdmin = this.userInfo.isAdmin;
      this.nickname = this.userInfo.userInfo.nickname;
    }

    this.userInfo.changesUser$.subscribe((data: any) => {
      this.isLogged = data.isLogged;
      this.isAdmin = data.isAdmin;
      this.nickname = data.nickname;
    });
  }

  public openDialog() {
    this.dialog.open(CartHeaderComponent, {
      width: '50vw',
      maxHeight: '90vh',
      data: null,   // The data is get from service
    });
  }

  signout() {
    this.userInfo.signOutUser();
  }
}
