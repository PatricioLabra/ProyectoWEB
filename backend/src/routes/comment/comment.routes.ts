import { Router } from 'express';
import * as commentCtrl from './comment.controller';

const router = Router();

//Agregar un nuevo comentario
router.post('/comment', commentCtrl.addComment);

//Obtener los comentarios de un producto
router.get ('/comment/:id', commentCtrl.getComments)

//Obtener el promedio de las calificaciones + su cantidad
router.get ('/comment/califications/:id', commentCtrl.getCalificationComments)

export default router;
