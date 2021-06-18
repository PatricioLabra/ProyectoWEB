import { Router } from 'express';
import * as cartCtrl from './cart.controller';
import { verifyToken } from '../jwt';


const router = Router();

//Agregar un nuevo carrito comprado
router.post('/cart', /*verifyToken,*/ cartCtrl.addCart);

// Obtener una seccion de los ultimos carritos agregados
router.get('/carts/newer/:init/:quantity', /*verifyTopken,*/ cartCtrl.getNewerCarts);

//Obtener información de un solo carrito comprado 
router.get('/cart/:id', /*verifyToken,*/ cartCtrl.getCart);

export default router;