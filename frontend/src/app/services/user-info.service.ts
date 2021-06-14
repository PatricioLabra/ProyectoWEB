import { Injectable } from '@angular/core';

import { UserInfo } from '@models/user-info.model';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  isLogged: boolean;
  isAdmin: boolean;
  userInfo: UserInfo;

  constructor() {
    this.isLogged = false;
    this.isAdmin = false;
    this.userInfo = { nickname: 'Visitant' };
  }

  signInUser(userInfo: UserInfo, isAdmin: boolean) {
    this.isAdmin = isAdmin;
    this.isLogged = true;
    this.userInfo = userInfo;
  }

  signOutUser() {
    this.isLogged = false;
    this.userInfo = { nickname: 'Visitant' };
  }
}
