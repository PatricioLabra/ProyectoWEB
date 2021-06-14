import { Router } from 'express';
import { UploadedFile } from 'express-fileupload';
import dotenv from 'dotenv';
import AWS from 'aws-sdk';

dotenv.config();

const s3 = new AWS.S3();

const router = Router();

router.get('/image/:id', (req, res) => {

});

router.get('/images', (req, res) => {

});

router.post('/image', async (req, res) => {
	if (!req.files)
		return res.status(401).send({ succes: false, message: 'No images' });

	// Si llega mas de una imagen, llega como array, sino como objeto
	const images: UploadedFile | UploadedFile[] = req.files.images;

	// Se parsea para trabajar con un array, independiente de si era 1 o mas de una
	const imagesArray: UploadedFile[] = (Array.isArray(images)) ? images : [images];

	try {
		const categoria = 'Prueba';

		const endpoint = `${process.env.AWS_ENDPOINT}/${categoria}`;
		s3.endpoint = new AWS.Endpoint(endpoint);

		console.log('partio');

		for (let i = 0; i < imagesArray.length; ++i) {
			const image: UploadedFile = imagesArray[i];

			const uploadedImage = await s3.putObject({
				ACL: 'public-read',
				Bucket: process.env.AWS_BUCKET_NAME || '',
				Body: image.data,
				Key: image.name
			}).promise();

			const urlImage = `${process.env.AWS_BUCKET_NAME}.${endpoint}/${image.name}`;

			console.log(urlImage);
			console.log(uploadedImage);
		}

		console.log('termino');

	} catch (error) {
		console.log(error);
		return res.status(400).send({ success: false, message: 'Error inesperado', error });
	}
	
	return res.status(200).send({ success: true });
});

router.put('/image/:id', (req, res) => {

});

router.delete('/image/:id', (req, res) => {

});

export default router;
