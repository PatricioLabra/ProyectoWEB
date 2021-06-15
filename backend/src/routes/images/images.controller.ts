import { RequestHandler } from 'express';
import { UploadedFile } from 'express-fileupload';
import dotenv from 'dotenv';
import AWS from 'aws-sdk';

dotenv.config();

const s3 = new AWS.S3();

export const getUrlImage: RequestHandler = (req, res) => {
	const category: string = req.params.category;
	const name: string = req.params.name;

	const endpoint: string = createEndpoint(category);
	const urlImage: string = makeURLImage(endpoint, name);

	return res.send({ success: true, urlImage });
}

export const uploadImage: RequestHandler = async (req, res) => {
	if (!req.files)
		return res.status(401).send({ succes: false, message: 'No images' });

	// Si llega mas de una imagen, llega como array, sino como objeto
	const images: UploadedFile | UploadedFile[] = req.files.images;

	// Se parsea para trabajar con un array, independiente de si era 1 o mas de una
	const imagesArray: UploadedFile[] = (Array.isArray(images)) ? images : [images];

	const imagesUrls: Array<string> = [];

	try {
		const category = req.body.category;

		const endpoint = createEndpoint(category);
		s3.endpoint = new AWS.Endpoint(endpoint);

		for (let i = 0; i < imagesArray.length; ++i) {
			const image: UploadedFile = imagesArray[i];

			await s3.putObject({
				ACL: 'public-read',
				Bucket: process.env.AWS_BUCKET_NAME || '',
				Body: image.data,
				Key: image.name
			}).promise();

			const urlImage = makeURLImage(endpoint, image.name);
			imagesUrls.push(urlImage);
		}

	} catch (error) {
		console.log(error);
		return res.status(400).send({ success: false, message: 'Error inesperado', error });
	}
	
	return res.status(200).send({ success: true, imagesSaved: imagesUrls.length, imagesUrls });
}

export const deleteImage: RequestHandler = (req, res) => {
	return res.send('Todo ok');
}

/**
 * Crea el endpoint en donde se guardara una imagen de un producto
 * @param category Categoria del producto, se usara para guardar la imagen en la carpeta de su categoria
 * @returns Endpoint en donde se guardara como cadena
 */
function createEndpoint(category: string): string {
	const endpoint = `${process.env.AWS_ENDPOINT}/${category}`;
	return endpoint;
}

/**
 * Crea y retorna la url de una imagen de un producto
 * @param endpoint Endpoint en donde se guardo la imagen del producto
 * @param imageName Nombre de la imagen guardada
 * @returns La url de la imagen recien guardada como cadena
 */
function makeURLImage(endpoint: string, imageName: string): string {
	const urlImage = `https://${process.env.AWS_BUCKET_NAME}.${endpoint}/${imageName}`;
	return urlImage;
}
