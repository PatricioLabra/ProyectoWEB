import express from 'express';
import morgan from 'morgan';

const app = express();

// Settings
app.set('port', process.env.PORT || 4000);


// Middlewares
app.use(morgan('dev'));


// Putting the server in listen
app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`);
});