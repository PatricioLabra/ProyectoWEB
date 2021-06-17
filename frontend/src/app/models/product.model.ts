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
			this._id = "",
			this.name = "";
			this.trademark = "";
			this.images_urls = [];
			this.price = 0;
			this.discount = 0;
			this.description = "";
			this.weight = 0;
			this.stock = 0;
			this.calification = 0;
			this.category = "";
			this.subcategories = [];
	}
}
