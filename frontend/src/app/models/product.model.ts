export interface Product {
	_id: string,
	name: string,
	trademark: string,
	images_urls: Array<string>,
	price: number,
	discount: number,
	description: string,
	weight: number,
	dimensions?: {
			height_cm: number,
			width_cm: number,
			length_cm: number
	},
	stock: number,
	calification: number,
	category: string,
	subcategories: Array<string>,
}
