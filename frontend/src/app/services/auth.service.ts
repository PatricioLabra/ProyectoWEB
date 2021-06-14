import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Profile } from '@models/profile.model';
import { UserInfo } from '@models/user-info.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'content-type': 'application/json'});
  }

  signUp(profile: Profile) {
    const url = `${environment.API_URL}/user/signin`;
    return this.http.post(url, profile);
  }

  getUserData(nickname: string, token: string) {
    const url = `${environment.API_URL}/user/${nickname}`;
    this.headers = this.headers.set('Authorization', 'Bearer ' + token);

    return this.http.get<UserInfo>(url, {headers: this.headers});
  }
}
