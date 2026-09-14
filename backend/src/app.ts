import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { appRoutes } from './routes/index.js';
import { errorHandler } from './middlewares/errorMiddleware.js';
import { sendError } from './utils/response.js';

export const app = express();

// Middlewares Globais
app.use(
  cors({
    origin: (origin, callback) => {
      // Permite requisições sem origin (como mobile apps, curl, Postman) ou origin configurado
      if (!origin || origin === env.FRONTEND_URL || origin.includes('localhost')) {
        callback(null, true);
      } else {
        callback(null, true); // Em dev, permite
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas da API
app.use('/api', appRoutes);

// Tratamento de Rota 404 (Não encontrada)
app.use((req, res) => {
  return sendError(res, `Rota não encontrada: ${req.method} ${req.originalUrl}`, 404);
});

// Middleware Global de Erros
app.use(errorHandler);
