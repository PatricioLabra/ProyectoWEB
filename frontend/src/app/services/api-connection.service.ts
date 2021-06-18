import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Profile } from '@models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ApiConnectionService {

  API_URL = environment.API_URL;
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'content-type': 'application/json'});
  }

  /**
   * Valida las credenciales del usuario
   * @param profile perfile con las credenciales del usuario
   */
  signIn(profile: Profile) {
    const url = this.makeUrl(['user', 'signin']);
    return this.http.post(url, profile);
  }

  /**
   * Obtiene los datos del usuario
   * @param nickname Nickname del usuario
   * @param token Token del usuario
   */
  getUserData(nickname: string, token: string) {
    const url = this.makeUrl(['user', nickname]);
    this.headers = this.setToken(token);

    return this.http.get(url, {headers: this.headers});
  }

  /**
   * Crear una url de la api, con los parametros ingresados
   * @param listParams Lista de parametros de la url
   * @returns url de la api con los parametros correspondientes
   */
  makeUrl(listParams: Array<string>): string {
    const params = listParams.join('/');
    const url = `${this.API_URL}/${params}`;
    return url;
  }

  /**
   * Establece la cabecera Authorization con el token ingresado
   * @param token Token del usuario
   * @returns HttpHeaders con la cabecera de Authorization
   */
  setToken(token: string): HttpHeaders {
    return this.headers.set('Authorization', 'Bearer ' + token);
  }
}
