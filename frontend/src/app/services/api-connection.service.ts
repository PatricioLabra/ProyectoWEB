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
   * Obtiene la informacion de un producto en base a su id
   * @param id Id del producto
   */
  getProduct(id: string) {
    const url = this.makeUrl(['product', id]);
    return this.http.get(url);
  }

  /**
   * Obtiene los productos mas nuevos, desde el producto 'initialProduct' mas nuevo, obtiene
   * 'quantityProducts'
   * @param initialProduct primer producto a traer
   * @param quantityProducts cantidad de productos a obtener
   */
  getNewerProducts(initialProduct: number, quantityProducts: number) {
    const url = this.makeUrl(['products', 'newer', initialProduct, quantityProducts]);
    return this.http.get(url);
  }

  /**
   * Obtiene los productos que coincidan con el texto ingresado
   * @param keyword texto de busqueda
   */
  getSearchProducts(keyword: string) {
    const url = this.makeUrl(['products', keyword]);
    this.http.get(url);
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
  makeUrl(listParams: Array<string | number>): string {
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
