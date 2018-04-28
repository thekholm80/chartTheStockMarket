import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

import { PORT, API_KEY } from './config/config';
import sockets from './sockets';

// dev only
import cors from 'cors';

const app = express();

const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true,
  preflightContinue: true
};

// set up socket.io
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  transports: ['websocket', 'xhr-polling']
});

io.origins('localhost:8080');
sockets(io);

// middleware
app.use(cors(corsOptions));
app.use(bodyParser.json({ strict: false }));

// api route to fetch stock data
app.post('/api/getstocklist', async (req, res) => {
  const { symbol } = req.body;
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ symbol }&interval=60min&outputsize=compact&apikey=${ API_KEY }`;
  axios.interceptors.response.use(
    response => response,
    error => Promise.reject(error.response.data)
  );
  const { data, status } = await axios.get(url).catch(error => ({ data: error }));
  res.json({ status, data });
});

// main/fallback route to serve front end
app.get('/*', (req, res) => {
  res.send('Under construction');
});

/*
    NOTE:
    This is server.listen(), not app.listen().  Don't spend another 4 hours
    on stack overflow debugging this stupid mistake again
*/
server.listen(PORT, () => console.log(`Express running on port ${ PORT }`));
