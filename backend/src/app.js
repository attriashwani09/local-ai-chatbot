import express from 'express';
import cors from 'cors';
import chatRoutes from './routes/chat.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

app.use('/api', chatRoutes);

export default app;