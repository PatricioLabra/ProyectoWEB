import { Router } from 'express';
import * as adminCtrl from './admin.controller';

const router = Router();

// Agregar un nuevo admin
router.post('/admin', adminCtrl.addAdmin);

// Obtener la informacion de un admin
router.get('/admin/:nick', adminCtrl.getAdmin);

// Validar que existe un admin
router.get('/admin/valid_nick/:nick', adminCtrl.validAdmin);

// Validar que la contraseña (body) sea valida
router.post('/admin/valid_pass', adminCtrl.validPass);

export default router;
