import express from 'express';
import clientRoutes from './routes/clientRoutes.js';

const app = express();

// Подключение маршрутов
app.use('/api', clientRoutes);

export default app;
