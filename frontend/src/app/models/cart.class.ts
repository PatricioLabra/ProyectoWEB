import { ProductCart } from '@models/product-cart.model';
import { CartService } from '@services/cart.service';

export class Cart {

  products: Array<ProductCart> = [];
  totalPrice: number = 0;

  constructor(protected cart: CartService) { }

  /**
   * Funcion que sera llamada cuando se subscriba al observable cart
   * @param listProducts Lista de los productos del carrito
   */
  handleCartChange = (listProducts: Array<ProductCart>) => { };

  /**
   * Si tiene disponibilidad, incrementa en 1 la cantidad, actualizando el precio final
   * de ese producto y el precio total, sino no hace nada.
   * @param index Indice del producto que se va a incrementar
   */
  incrementProduct(index: number) {
    this.cart.insertProduct(this.products[index]);
  }

  /**
   * Decrementa en 1 la cantidad de un producto, actualizando el precio final de ese producto
   * y el precio total. Si la cantidad llega a 0, se elimina del carrito.
   * @param index Indice del producto que se va a decrementar
   */
  decrementProduct(index: number) {
    this.cart.removeProduct(this.products[index]);
  }

  /**
   * Elimina todos los elementos del carrito, y establece el precio final en 0
   */
  emptyCart() {
    this.cart.emptyCart();
  }
}
