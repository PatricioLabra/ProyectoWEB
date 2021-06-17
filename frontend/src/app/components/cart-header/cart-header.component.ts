import { Component } from '@angular/core';
import { ProductCart } from '@models/product-cart.model';
import { Product } from '@models/product.model';
import { CartService } from '@services/cart.service';

@Component({
  selector: 'app-cart-header',
  templateUrl: './cart-header.component.html',
  styleUrls: ['./cart-header.component.scss']
})
export class CartHeaderComponent {

  // Just for debub, remove later
  products_: Array<Product> = [
    {
        "_id": "60c6bf9282cdd039186ae8f3",
        "name": "Mascarilla Backstreet Boys",
        "trademark": "",
        "images_urls": [
            "https://tienda-ecommerce.sfo3.digitaloceanspaces.com/Ropa/mascarilla_backstreet_boys_1.jpg",
            "https://tienda-ecommerce.sfo3.digitaloceanspaces.com/Ropa/mascarilla_backstreet_boys_2.jpg"
        ],
        "price": 4500,
        "discount": 0.1,
        "description": "Mascarilla reutilizable con 4 capas protectoras. Construida con algodón y Poliester",
        "weight": 50,
        "dimensions": {
            "height_cm": 8,
            "width_cm": 0.3,
            "length_cm": 18
        },
        "stock": 20,
        "calification": 4.8,
        "category": "Ropa",
        "subcategories": [
            "Accesorios",
            "Hombre",
            "Mujer"
        ]
    },
    {
        "_id": "60c6c03682cdd039186ae8f4",
        "name": "Mascarilla Principe del Rap",
        "trademark": "",
        "images_urls": [
            "https://tienda-ecommerce.sfo3.digitaloceanspaces.com/Ropa/mascarilla_principe_del_rap_1.jpg",
            "https://tienda-ecommerce.sfo3.digitaloceanspaces.com/Ropa/mascarilla_principe_del_rap_2.jpg",
            "https://tienda-ecommerce.sfo3.digitaloceanspaces.com/Ropa/mascarilla_principe_del_rap_3.jpg"
        ],
        "price": 4500,
        "discount": 0.15,
        "description": "Mascarilla reutilizable con 4 capas protectoras. Construida con algodón y Poliester",
        "weight": 50,
        "dimensions": {
            "height_cm": 8,
            "width_cm": 0.3,
            "length_cm": 18
        },
        "stock": 19,
        "calification": 4.5,
        "category": "Ropa",
        "subcategories": [
            "Accesorios",
            "Hombre",
            "Mujer"
        ]
    },
    {
        "_id": "60c6c08182cdd039186ae8f5",
        "name": "Polera Blockbuster",
        "trademark": "",
        "images_urls": [
            "https://tienda-ecommerce.sfo3.digitaloceanspaces.com/Ropa/polera_blockbuster_1.jpg"
        ],
        "price": 15000,
        "discount": 0,
        "description": "Polera hecha con poliéster y tacto de algodón. Esta polera noventera busca revivir la estética mas pura y geométrica de aquellos años.",
        "weight": 500,
        "dimensions": {
            "height_cm": 72,
            "width_cm": 1,
            "length_cm": 54
        },
        "stock": 10,
        "calification": 5,
        "category": "Ropa",
        "subcategories": [
            "Moda",
            "Hombre",
            "Mujer"
        ]
    }
  ];

  products: Array<ProductCart> = this.products_.map((product: Product) => new ProductCart(product, 2));
  //products: Array<ProductCart> = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {
    this.totalPrice = this.products.reduce((total, producto) => total + producto.finalPrice, 0);
    this.products.forEach((product: ProductCart) => this.cartService.insertProduct(product));
  }

  /**
   * Si tiene disponibilidad, incrementa en 1 la cantidad, actualizando el precio final
   * de ese producto y el precio total, sino no hace nada.
   * @param index Indice del producto que se va a incrementar
   */
  incrementProduct(index: number) {
    const itChanges = this.cartService.insertProduct(this.products[index]);

    if (itChanges)
      this.totalPrice += this.products[index].getUnitPriceWithDiscount();
  }

  /**
   * Decrementa en 1 la cantidad de un producto, actualizando el precio final de ese producto
   * y el precio total. Si la cantidad llega a 0, se elimina del carrito.
   * @param index Indice del producto que se va a decrementar
   */
  decrementProduct(index: number) {
    const itChanges = this.cartService.removeProduct(this.products[index]);

    if (itChanges)
      this.totalPrice -= this.products[index].getUnitPriceWithDiscount();
  }

  /**
   * Elimina todos los elementos del carrito, y establece el precio final en 0
   */
  vaciar() {
    this.products = [];
    this.totalPrice = 0;
  }
}
