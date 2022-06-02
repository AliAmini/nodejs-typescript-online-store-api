import * as express from "express";
import * as bodyParser from "body-parser";
import routesV1 from './api/v1/index.js';

const PORT = config.app.port;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => res.send('Welcome to the API!'))

app.use('/api/v1', routesV1);


app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))