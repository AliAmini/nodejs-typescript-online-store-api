import express, {Express} from "express";
import bodyParser from 'body-parser'
import cors from "cors";
import * as dotenv from "dotenv";
import helmet from "helmet";
import routesV1 from './api/v1/index';
import morgan from "morgan";

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
  console.error('ERROR: You need to specify `PORT` in .env file.');
  process.exit(1);
}

export const PORT: number = parseInt(process.env.PORT);
const app: Express = express();



/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan('dev'));


app.get('/', (req, res) => res.send('Welcome to the API!'))

app.use('/api/v1', routesV1);


export default app;