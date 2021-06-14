import { Injectable } from '@angular/core';

import { UserInfo } from '@models/profile-info.model';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  isLogged: boolean;
  isAdmin: boolean;
  profileInfo: UserInfo;

  constructor() {
    this.isLogged = false;
    this.isAdmin = false;
    this.profileInfo = { nickname: 'Visitant' };
  }

  signInUser(profileInfo: UserInfo, isAdmin: boolean) {
    this.isAdmin = isAdmin;
    this.isLogged = true;
    this.profileInfo = profileInfo;
  }

  signOutUser() {
    this.isLogged = false;
    this.profileInfo = { nickname: 'Visitant' };
  }
}
