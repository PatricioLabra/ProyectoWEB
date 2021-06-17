import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductCart } from '@models/product-cart.model';
import { Product } from '@models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _cart = new BehaviorSubject<Array<ProductCart>>([]);
  public currentDataCart$ = this._cart.asObservable();

  constructor() { }

  /**
   * Comprueba si el producto ya esta ingresado, si es asi incrementa en 1 su cantidad,
   * sino ingresa el producto en el carrito
   * @param product Producto a insertar al carro
   * @param quantityToInsert cantidad de productos a insertar
   */
  insertProduct(product: ProductCart, quantityToInsert: number = 1): void {
    const listProducts = this._cart.getValue();
    const index = this.searchProduct(listProducts, product);

    if (-1 == index)
      listProducts.push(product);
    else if (listProducts[index].stock >= (listProducts[index].quantity + quantityToInsert))
      listProducts[index].increaseQuantity(quantityToInsert);

    console.log(listProducts);
    this._cart.next(listProducts);
  }

  /**
   * Comprueba si el producto esta ingresado, si es asi decrementa en 1 su cantidad,
   * sino no hace nada. Si la cantidad llega a 0, elimina el producto del carrito.
   * @param product Producto a insertar al carro
   * @param quantityToInsert cantidad de productos a insertar
   */
  removeProduct(product: ProductCart, quantityToRemove: number = 1): void {
    const listProducts = this._cart.getValue();
    const index = this.searchProduct(listProducts, product);

    if (index != -1) {
      listProducts[index].decreaseQuantity(quantityToRemove);

      if (listProducts[index].quantity <= 0) {
        listProducts[index].quantity = 1;
        listProducts.splice(index, 1);
      }

      console.log(listProducts);
      this._cart.next(listProducts);
    }
  }

  /**
   * Elimina todos los elementos del carrito
   */
  emptyCart(): void {
    const listProducts: Array<ProductCart> = [];
    console.log(listProducts);
    this._cart.next(listProducts);
  }

  /**
   * Busca el producto ingresado en la lista productos
   * @param listProducts Lista de productos del carrito
   * @param product Producto a buscar
   * @returns number, indice en donde esta el producto, sino esta devuelve -1
   */
  searchProduct(listProducts: Array<ProductCart>, product: ProductCart): number {
    return listProducts.findIndex((productCart: ProductCart) => productCart._id == product._id);
  }
}
