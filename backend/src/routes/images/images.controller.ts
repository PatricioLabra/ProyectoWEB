import { RequestHandler } from 'express';
import { UploadedFile } from 'express-fileupload';
import dotenv from 'dotenv';
import AWS from 'aws-sdk';

dotenv.config();

const s3 = new AWS.S3();

/**
 * Sube todas las imagenes del request hacia digital y retorna la urls de las imagenes subidas
 * @route Post /image
 * @param req Request, se espera que traiga las imagenes
 * @param res Response, retornara la cantidad de imagenes subidas y sus urls si todo sale bien
 */
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

/**
 * Elimina una imagen de digital
 * @route Delete /image/:category/:imageName
 * @param req Request, se espera que tenga la categoria y el nombre de la imagen
 * @param res Response retornara true si todo sale bien
 */
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
