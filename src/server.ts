'use strict';

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { productRouter } from './routes/product.router.js';
import { initDB } from './utils/initDB.js';

dotenv.config();

// const { CLIENT_URL } = process.env;

// const corsOptions = {
//   origin: CLIENT_URL,
//   credentials: true,
// };

const corsOptions = {
  origin: '*',
};

export const createServer = () => {
  const app = express();

  initDB();
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use('/img', express.static(path.join('img')));
  app.use('/products', express.json(), productRouter);

  app.use('/', (_, res) => {
    res.send('Hello world, server is running');
  });

  return app;
};
