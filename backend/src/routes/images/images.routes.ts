import { Router } from 'express';
import * as imagesCtrl from './images.controller';

const router = Router();

// Subir una imagen
router.post('/image', imagesCtrl.uploadImage);

// Eliminar una imagen
router.delete('/image/:category/:imageName', imagesCtrl.deleteImage);

export default router;
