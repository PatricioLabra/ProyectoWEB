import { Router } from 'express';
import * as userCtrl from './user.controller';
import { verifyToken } from '../jwt';

const router = Router();

// Agregar un nuevo usuario
router.post('/user/signup', userCtrl.signUp);

// Obtener la informacion de un usuario
router.get('/user/:nick', userCtrl.getUser);

// Inicia sesion
router.post('/user/signin', userCtrl.signIn);

// Obtener una seccion de los usuarios mas nuevos
router.get('/users/newer/:init/:quantity', verifyToken, userCtrl.getNewerUsers)

export default router;
