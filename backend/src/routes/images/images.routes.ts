import { Router } from 'express';
import * as imagesCtrl from './images.controller';
import { verifyToken } from '../jwt';

const router = Router();

// Subir una imagen
router.post('/image', verifyToken, imagesCtrl.uploadImage);

// Eliminar una imagen
router.delete('/image/:category/:imageName', verifyToken, imagesCtrl.deleteImage);

export default router;
