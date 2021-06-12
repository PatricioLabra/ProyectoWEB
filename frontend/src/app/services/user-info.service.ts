import { Injectable } from '@angular/core';

import { ProfileInfo } from '@models/profile-info.model';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  isLogged: boolean;
  isAdmin: boolean;
  profileInfo: ProfileInfo;

  constructor() {
    this.isLogged = false;
    this.isAdmin = false;
    this.profileInfo = { nickname: 'Visitant' };
  }

  signInUser(profileInfo: ProfileInfo, isAdmin: boolean) {
    this.isAdmin = isAdmin;
    this.isLogged = true;
    this.profileInfo = profileInfo;
  }

  signOutUser() {
    this.isLogged = false;
    this.profileInfo = { nickname: 'Visitant' };
  }
}
