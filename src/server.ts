import app, {PORT} from '@src/app';
import { connectDatabase } from "@helpers/Database.helper";


/**
 * Server & Database Activation
 */

connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`\nServer is listening on port ${PORT}\n`);
  });
});