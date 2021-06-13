import { Router } from 'express';
import * as productCtrl from './product.controller';

const router = Router();

// Agregar un nuevo producto
router.post('/product', productCtrl.addProduct);

// Obtener la informacion de un producto
router.get('/product/:id', productCtrl.getProduct);

// Modificar un producto
router.put('/product/update/:id', productCtrl.updateProduct);

// Obtener una seccion de los productos mas nuevos
router.get('/products/newer/:init/:quantity', productCtrl.getNewerProducts);

// Obtener lista de productos filtrados 
router.get('/products/filtered', productCtrl.getFilteredProducts);

//Obtener lista de productos buscados
router.get('/products/search/:text', productCtrl.getSearchProducts);

export default router;