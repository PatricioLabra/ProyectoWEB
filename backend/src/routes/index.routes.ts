import { Router } from 'express';
import adminRoutes from './admin/admin.routes';
import userRoutes from './user/user.routes';
import productRoutes from './product/product.routes';
import imageRouter from './images/images.routes';
import cartRoutes from  './cart/cart.routes';
import commentRoutes from './comment/comment.routes';
const router = Router();

router.get('/', (req, res) => {
  return res.send('Welcome to my API!');
});

export default [router, userRoutes, adminRoutes, productRoutes, imageRouter, cartRoutes, commentRoutes];
