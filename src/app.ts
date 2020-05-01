import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import 'express-async-errors';

import routes from './routes';

import createConnection from './database';

import ExceptionGlobalMiddleware from './middlewares/ExceptionGlobalMiddleware';

createConnection();
const app = express();

app.use(express.json());
app.use(routes);
app.use(ExceptionGlobalMiddleware);

export default app;
