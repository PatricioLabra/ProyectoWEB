import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

// Internal imports
import indexRoutes from './routes/index.routes';

const app = express();
const cors_config = {
  origin: 'localhost:4200',
  credentials: true
}

// Settings
app.set('port', process.env.PORT || 4000);


// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors(cors_config));


// Routes
app.use(indexRoutes);


// Putting the server in listen
app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`);
});