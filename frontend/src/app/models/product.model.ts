export class Product {
	_id: string;
	name: string;
	trademark: string;
	images_urls: Array<string>;
	price: number;
	discount: number;
	description: string;
	weight: number;
	dimensions?: {
			height_cm: number,
			width_cm: number,
			length_cm: number
	};
	stock: number;
	calification: number;
	category: string;
	subcategories: Array<string>;

	constructor() {
			this._id = "60c81124c727db35ac704bbb",
			this.name = "Salvando al Soldado Ryan";
			this.trademark = "";
			this.images_urls = ["https://tienda-ecommerce.sfo3.digitaloceanspaces.com/Peliculas/salvar_al_soldado_ryan_2.jpg"];
			this.price = 9990;
			this.discount = 0.1;
			this.description = "Después de desembarcar en Normandía";
			this.weight = 83.16,
			this.dimensions = {
					height_cm: 18.03,
					width_cm: 1.48,
					length_cm: 13.76
			};
			this.stock = 4;
			this.calification = 4.9;
			this.category = "Películas";
			this.subcategories = ["Acción"]
	}
}
