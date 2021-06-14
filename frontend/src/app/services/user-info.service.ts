import { Injectable } from '@angular/core';

import { UserInfo } from '@models/user-info.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  isLogged: boolean;
  isAdmin: boolean;
  userInfo: UserInfo;
  token: string;

  constructor(private auth: AuthService) {
    this.isLogged = false;
    this.isAdmin = false;
    this.userInfo = { nickname: 'Visitant' };
    this.token = '';
  }

  signInUser(nickname: string, token: string, isAdmin: boolean) {
    this.isAdmin = isAdmin;
    this.isLogged = true;
    this.token = token;

    this.auth.getUserData(nickname, token).subscribe((data: UserInfo) => {
      console.log(data);
    });
  }

  signOutUser() {
    this.isLogged = false;
    this.isAdmin = false;
    this.userInfo = { nickname: 'Visitant' };
    this.token = '';
  }
}
