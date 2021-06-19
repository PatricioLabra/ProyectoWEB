import { Router } from 'express';
import * as commentCtrl from './comment.controller';
import { verifyToken } from '../jwt';

const router = Router();

//Agregar un nuevo comentario
router.post('/comment', commentCtrl.addComment);

//Obtener los comentarios de un producto
router.get ('/comments/:id', commentCtrl.getComments)

//Obtener el promedio de las calificaciones + su cantidad
router.get ('/comments/califications/:id', commentCtrl.getCalificationComments)

export default router;
