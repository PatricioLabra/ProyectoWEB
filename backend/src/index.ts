import express, { json } from 'express';
import morgan from 'morgan';

const app = express();

// Settings
app.set('port', process.env.PORT || 4000);


// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


// Putting the server in listen
app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`);
});