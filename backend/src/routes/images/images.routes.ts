import { Router } from "express";
import { UploadedFile } from "express-fileupload";

const router = Router();

router.get('/image/:id', (req, res) => {

});

router.get('/images', (req, res) => {

});

router.post('/image', (req, res) => {
	if (!req.files)
		return res.status(401).send({ succes: false, message: 'No images' });

	// Si llega mas de una imagen, llega como array, sino como objeto
	const images: UploadedFile | UploadedFile[] = req.files.images;

	// Se parsea para trabajar con un array, independiente de si era 1 o mas de una
	const imagesArray: UploadedFile[] = (Array.isArray(images)) ? images : [images];
	

	return res.send('Received');
});

router.put('/image/:id', (req, res) => {

});

router.delete('/image/:id', (req, res) => {

});

export default router;
