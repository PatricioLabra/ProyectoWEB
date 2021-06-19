import app from './app';
import { startConnection } from './database';

// Putting the server in listen
async function main() {
  startConnection();

  app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`);
  });
}

main();
