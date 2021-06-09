import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

// Internal imports
import indexRoutes from './routes/index.routes';
import { startConnection } from './database';

const app = express();
const corsConfig = {
  origin: 'http://localhost:4200',
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


// Putting the server in listen
async function main() {
  startConnection();

  app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`);
  });
}

main();
