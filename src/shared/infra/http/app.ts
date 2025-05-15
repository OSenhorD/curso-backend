import 'reflect-metadata';
import 'dotenv/config';

import cors from 'cors';
import express from 'express';

import '@/shared/container';

import { startConnection } from '@/shared/infra/typeorm';

startConnection();

const app = express();

app.use(express.json());

const allowedOrigins = '*';

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
};

app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
