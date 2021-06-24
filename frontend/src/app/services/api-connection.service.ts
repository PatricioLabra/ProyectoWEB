import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Profile } from '@models/profile.model';
import { FilterType } from '@models/filter.model';

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
   * Obtiene los carritos comprados mas nuevos, desde el carrito 'initialCart' mas nuevo, obtiene
   * 'quantityCarts'
   * @param initialCart primer carrito a traer
   * @param quantityCarts cantidad de carrito a obtener
   */
  getNewerCarts(initialCart: number, quantityCarts: number) {
    const url = this.makeUrl(['carts', 'newer', initialCart, quantityCarts]);
    return this.http.get(url);
  }

  /**
   * Obtiene los comentarios de un producto
   * @param id_product Id del producto al que se quiere obtener los comentarios
   */
  getCommentsProduct(id_product: string) {
    const url = this.makeUrl(['comment', id_product]);
    return this.http.get(url);
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
   * @param initialProduct primer producto a traer
   * @param quantityProducts cantidad de productos a obtener
   */
  getSearchProducts(keyword: string, initialProduct: number, quantityProducts: number) {
    const url = this.makeUrl(['products', keyword, initialProduct, quantityProducts]);
    return this.http.get(url);
  }

  /**
   * Obtiene los productos que coincidan con el filtro ingresado
   * @param filter Filtro que se aplicara a los productos para buscarlos
   * @param initialProduct primer producto a traer
   * @param initialProduct primer producto a traer
   * @param quantityProducts cantidad de productos a obtener
   * @param quantityProducts cantidad de productos a obtener
   */
  getFilteredProducts(filter: FilterType, initialProduct: number, quantityProducts: number) {
    const url = this.makeUrl(['products', 'filtered', initialProduct, quantityProducts]);
    return this.http.post(url, filter);
  }

  /**
   * Obtiene los usuarios mas nuevos, desde el usuario 'initialUser' mas nuevo, obtiene
   * 'quantityUsers'
   * @param initialUsers primer usuario a traer
   * @param quantityUsers cantidad de usuarios a obtener
   */
  getNewerUsers(token: string, initialUser: number, quantityUsers: number) {
    const url = this.makeUrl(['users', 'newer', initialUser, quantityUsers]);
    this.headers = this.setToken(token);
    return this.http.get(url, { headers: this.headers });
  }

  /**
   * Valida las credenciales del usuario
   * @param profile perfile con las credenciales del usuario
   */
  signIn(profile: Profile, isAdmin: boolean = false) {
    const endpoint = (isAdmin) ? 'admin' : 'user';
    const url = this.makeUrl([endpoint, 'signin']);
    return this.http.post(url, profile);
  }

  /**
   * Valida las credenciales del usuario
   * @param profile perfile con las credenciales del usuario
   */
  signUp(userInfo: any, isAdmin: boolean = false) {
    const endpoint = (isAdmin) ? 'admin' : 'user';
    const url = this.makeUrl([endpoint, 'signup']);
    return this.http.post(url, userInfo);
  }

  /**
   * Obtiene los datos del usuario
   * @param nickname Nickname del usuario
   * @param token Token del usuario
   */
  getUserData(nickname: string, token: string, isAdmin: boolean = false) {
    const endpoint = (isAdmin) ? 'admin' : 'user';
    const url = this.makeUrl([endpoint, nickname]);
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
