import { Router } from 'express';
import * as adminCtrl from './admin.controller';
import { verifyToken } from '../jwt';


const router = Router();

// Agregar un nuevo admin
router.post('/admin/signup', adminCtrl.signUp);

// Obtener la informacion de un admin
router.get('/admin/:nick', verifyToken, adminCtrl.getAdmin);

// Inicia sesión
router.post('/admin/signin', adminCtrl.signIn);

export default router;
