import { Router } from 'express';
import * as adminCtrl from './admin.controller';


const router = Router();

// Agregar un nuevo admin
router.post('/admin/signup', adminCtrl.signUp);

// Obtener la informacion de un admin
router.get('/admin/:nick', adminCtrl.getAdmin);

// Inicia sesión
router.post('/admin/signin', adminCtrl.signIn);

export default router;