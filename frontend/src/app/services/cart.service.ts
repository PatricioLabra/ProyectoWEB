import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductCart } from '@models/product-cart.model';
import { Product } from '@models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

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

  private _cart = new BehaviorSubject<Array<ProductCart>>([]);
  public currentDataCart$ = this._cart.asObservable();

  constructor() {
    const listProducts = this.products_.map((product: Product) => new ProductCart(product, 2));

    this._cart.next(listProducts);
  }

  insertProduct(product: ProductCart, quantityToInsert: number = 1): void {
    const listProducts = this._cart.getValue();
    const index = this.searchProduct(listProducts, product);

    if (index != -1)
      listProducts[index].increaseQuantity(quantityToInsert);
    else
      listProducts.push(product);

    this._cart.next(listProducts);
  }

  removeProduct(product: ProductCart, quantityToRemove: number = 1): void {
    const listProducts = this._cart.getValue();
    const index = this.searchProduct(listProducts, product);

    if (index != -1) {
      listProducts[index].decreaseQuantity(quantityToRemove);

      if (listProducts[index].quantity <= 0)
        listProducts.splice(index, 1);
    }

    this._cart.next(listProducts);
  }

  emptyCart(): void {
    const listProducts: Array<ProductCart> = [];
    this._cart.next(listProducts);
  }

  searchProduct(listProducts: Array<ProductCart>, product: ProductCart): number {
    return listProducts.findIndex((productCart: ProductCart) => productCart._id == product._id);
  }
}
