import { Injectable } from '@angular/core';
import { UserInfo } from '@models/user-info.model';
import { ApiConnectionService } from './api-connection.service';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  changeUser: Subject<{isLogged: boolean, isAdmin: boolean, nickname: string}> = new Subject();
  changesUser$ = this.changeUser.asObservable();

  isLogged: boolean;
  isAdmin: boolean;
  userInfo: UserInfo;
  token: string;

  constructor(private api: ApiConnectionService, private cookies: CookieService) {
    this.isLogged = false;
    this.isAdmin = false;
    this.userInfo = { nickname: 'Visitant' };
    this.token = '';

    if (this.checkUserCookie()) {
      this.loadUserCookie();
      this.isLogged = true;
      console.log(this.userInfo);
      this.changeUser.next({isLogged: this.isLogged, isAdmin: this.isAdmin, nickname: this.userInfo.nickname});
    }
  }

  signInUser(nickname: string, token: string, isAdmin: boolean, savePass: boolean=true) {
    this.isAdmin = isAdmin;
    this.isLogged = true;
    this.token = token;
    this.userInfo.nickname = nickname;

    this.api.getUserData(nickname, token, isAdmin).subscribe((data: any) => {
      this.userInfo = data.userInfo;

      if (savePass) {
        this.saveUserCookie();
      }

      this.changeUser.next({isLogged: this.isLogged, isAdmin: this.isAdmin, nickname: this.userInfo.nickname});
    });
  }

  signOutUser() {
    this.isLogged = false;
    this.isAdmin = false;
    this.userInfo = { nickname: 'Visitant' };
    this.token = '';
    this.changeUser.next({isLogged: this.isLogged, isAdmin: this.isAdmin, nickname: this.userInfo.nickname});
    this.deleteUserCookie();
  }

  deleteUserCookie() {
    this.cookies.delete('user');
  }

  saveUserCookie() {
    const userString = JSON.stringify({ userInfo: this.userInfo, isAdmin: this.isAdmin, token: this.token });
    this.cookies.set('user', userString);
    console.log(userString);
  }

  loadUserCookie() {
    if (this.checkUserCookie()) {
      const userString = this.cookies.get('user');
      const { userInfo, isAdmin, token } = JSON.parse(userString);

      this.userInfo = userInfo;
      this.isAdmin = isAdmin;
      this.token = token;
    }
  }

  checkUserCookie(): boolean {
    return this.cookies.check('user');
  }
}
