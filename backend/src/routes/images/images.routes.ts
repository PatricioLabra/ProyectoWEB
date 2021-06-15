import { Router } from 'express';
import * as imagesCtrl from './images.controller';

const router = Router();

router.get('/image/:category/:name', imagesCtrl.getUrlImage);

router.post('/image', imagesCtrl.uploadImage);

router.delete('/image/:id', imagesCtrl.deleteImage);

export default router;
