import { Router } from 'express';
import adminRoutes from './admin/admin.routes';
import userRoutes from './user/user.routes';

const router = Router();

router.get('/', (req, res) => {
  return res.send('Welcome to my API!');
});

export default [router, userRoutes, adminRoutes];
