import { Component, Input } from '@angular/core';
import { Product } from '@models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input()
  product: Product = {
    "_id": "60c81124c727db35ac704bbb",
    "name": "Salvando al Soldado Ryan",
    "trademark": "",
    "images_urls": [
        "https://tienda-ecommerce.sfo3.digitaloceanspaces.com/Peliculas/salvar_al_soldado_ryan_1.jpg",
        "https://tienda-ecommerce.sfo3.digitaloceanspaces.com/Peliculas/salvar_al_soldado_ryan_2.jpg"
    ],
    "price": 9990,
    "discount": 0.1,
    "description": "Después de desembarcar en Normandía, en plena Segunda Guerra Mundial, unos soldados norteamericanos deben arriesgar sus vidas para salvar al soldado James Ryan, cuyos tres hermanos han muerto en la guerra.",
    "weight": 83.16,
    "dimensions": {
        "height_cm": 18.03,
        "width_cm": 1.48,
        "length_cm": 13.76
    },
    "stock": 4,
    "calification": 4.9,
    "category": "Películas",
    "subcategories": [
        "Acción"
    ]
  };

  constructor() {
  }
}
