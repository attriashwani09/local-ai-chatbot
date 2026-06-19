import express from 'express';
import { askOllama } from '../services/llm.service.js';

const router = express.Router();

router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const reply = await askOllama(message);

    res.json({ reply });
  } catch (error) {
    console.error('Chat route error:', error.message);
    res.status(500).json({ error: 'Something went wrong while talking to the AI model' });
  }
});

export default router;