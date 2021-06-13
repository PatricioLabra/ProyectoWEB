import { Router } from 'express';
import * as adminCtrl from './admin.controller';

const router = Router();

// Agregar un nuevo admin
router.post('/user', adminCtrl.addAdmin);

// Obtener la informacion de un admin
router.get('/user/:nick', adminCtrl.getAdmin);

// Validar que existe un admin
router.get('/user/valid_nick/:nick', adminCtrl.validAdmin);

// Validar que la contraseña (body) sea valida
router.post('/user/valid_pass', adminCtrl.validPass);

export default router;
