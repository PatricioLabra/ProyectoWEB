import { Router } from 'express';
import * as productCtrl from './product.controller';
import { verifyToken } from '../jwt';

const router = Router();

// Agregar un nuevo producto
router.post('/product', verifyToken, productCtrl.addProduct);

// Agregar las rutas de las imagenes a un producto
router.put('/product/:id/images', verifyToken, productCtrl.setImagesProduct);

// Modificar un producto
router.put('/product/:id', verifyToken, productCtrl.updateProduct);

// Obtener la informacion de un producto
router.get('/product/:id', productCtrl.getProduct);

// Obtener una seccion de los productos mas nuevos
router.get('/products/newer/:init/:quantity', productCtrl.getNewerProducts);

// Obtener lista de productos filtrados 
router.post('/products/filtered', productCtrl.getFilteredProducts);

//Obtener lista de productos buscados
router.get('/products/search/:text', productCtrl.getSearchProducts);

export default router;
