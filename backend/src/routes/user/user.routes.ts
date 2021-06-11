import { Router } from 'express';
import * as userCtrl from './user.controller';

const router = Router();

// Agregar un nuevo usuario
router.post('/user', userCtrl.addUser);

// Obtener la informacion de un usuario
router.get('/user/:nick', userCtrl.getUser);

// Validar que existe un usuario
router.get('/user/valid_nick/:nick', userCtrl.validUser);

// Validar que la contraseña (body) sea valida
router.post('/user/valid_pass', userCtrl.validPass);

// Obtener una seccion de los usuarios mas nuevos
router.get('/users/newer/:init/:quantity', userCtrl.getNewerUsers)

export default router;
