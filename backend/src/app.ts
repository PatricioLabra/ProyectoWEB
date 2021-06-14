import express from 'express';
import morgan from 'morgan';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import fileUpload, { Options } from 'express-fileupload';

dotenv.config();

// Internal imports
import indexRoutes from './routes/index.routes';

// Configs variables
const app = express();
const corsConfig: CorsOptions = {
  origin: process.env.ORIGIN_FRONT_IP,
  credentials: true
};
const fileUploadConfig: Options = {
  tempFileDir: './temp'
}

// Settings
app.set('port', process.env.PORT || 4000);


// Middlewares
app.use(fileUpload(fileUploadConfig));
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors(corsConfig));


// Routes
app.use(indexRoutes);

export default app;
