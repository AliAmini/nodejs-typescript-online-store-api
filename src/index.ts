import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
// import * as bodyParser from "body-parser";
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

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => res.send('Welcome to the API!'))

app.use('/api/v1', routesV1);


/**
 * Server Activation
 */
app.listen(PORT, () => {
  console.log(`ُ\n\nServer is listening on port ${PORT}\n\n`);
});