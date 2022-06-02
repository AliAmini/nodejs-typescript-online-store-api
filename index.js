import express from 'express';
import bodyParser from 'body-parser';
import routesV1 from './src/api/v1';
import config from './config/config.json';

const PORT = config.app.port;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => res.send('Welcome to the API!'))

app.use('/api/v1', routesV1);


app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))