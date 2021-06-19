import { Injectable } from '@angular/core';
import { UserInfo } from '@models/user-info.model';
import { ApiConnectionService } from './api-connection.service';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  isLogged: boolean;
  isAdmin: boolean;
  userInfo: UserInfo;
  token: string;

  constructor(private api: ApiConnectionService) {
    this.isLogged = false;
    this.isAdmin = false;
    this.userInfo = { nickname: 'Visitant' };
    this.token = '';
  }

  signInUser(nickname: string, token: string, isAdmin: boolean) {
    this.isAdmin = isAdmin;
    this.isLogged = true;
    this.token = token;
    this.userInfo.nickname = nickname;

    this.api.getUserData(nickname, token, isAdmin).subscribe((data: any) => {
      console.log(data);
      this.userInfo = data.userInfo;
    });
  }

  signOutUser() {
    this.isLogged = false;
    this.isAdmin = false;
    this.userInfo = { nickname: 'Visitant' };
    this.token = '';
  }
}
