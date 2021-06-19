import { Component, OnInit } from '@angular/core';

import { UserInfoService } from '@services/user-info.service';
import { CategoryList } from '@models/category-types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  CategoryTypes = CategoryList;

  constructor(private userInfo: UserInfoService) { }

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

  // Just for debug, remove later
  signout() {
    this.userInfo.isLogged = false;
  }
}
