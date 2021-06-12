import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// Internal imports
import indexRoutes from './routes/index.routes';

const app = express();
const corsConfig = {
  origin: process.env.ORIGIN_FRONT_IP,
  credentials: true
}

// Settings
app.set('port', process.env.PORT || 4000);


// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors(corsConfig));


// Routes
app.use(indexRoutes);

export default app;