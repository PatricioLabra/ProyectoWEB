import { Component, OnInit } from '@angular/core';

import { UserInfoService } from '@services/user-info.service';
import { CategoryTypesList } from '@models/category-types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  CategoryTypes = CategoryTypesList;

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
    return this.userInfo.profileInfo.nickname;
  }

  // Just for debug, remove later
  login() {
    this.userInfo.isLogged = true;
    this.userInfo.isAdmin = true;
  }

  signout() {
    this.userInfo.isLogged = false;
  }
}
