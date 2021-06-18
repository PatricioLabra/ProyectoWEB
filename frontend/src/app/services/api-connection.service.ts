import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';

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
