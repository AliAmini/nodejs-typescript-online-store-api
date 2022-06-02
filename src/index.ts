import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
import helmet from "helmet";
import routesV1 from './api/v1/index';

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
  console.error('ERROR: You need to specify `PORT` in .env file.');
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT);
const app = express();



/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => res.send('Welcome to the API!'))

app.use('/api/v1', routesV1);


/**
 * Server Activation
 */
app.listen(PORT, () => {
  console.log(`ُ\nServer is listening on port ${PORT}\n`);
});


/**
 * Database Activation
 */
const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('ERROR: You need to specify `DATABASE_URL` in .env file.');
  process.exit(1);
}
mongoose
    .connect(DATABASE_URL)
    .then(() => {
      console.log('\nMongoDb connection status: Connected ✅✅✅\n');
    })