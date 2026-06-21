import express from 'express';
import { askOllama, buildConstrainedPrompt } from '../services/llm.service.js';
import { retrieveRelevantChunks } from '../services/retrieval.service.js';

const router = express.Router();

router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const relevantChunks = await retrieveRelevantChunks(message);

    if (relevantChunks.length === 0) {
      return res.json({ reply: 'Data not available.', sources: [] });
    }

    const prompt = buildConstrainedPrompt(message, relevantChunks);
    const reply = await askOllama(prompt);

    const sources = relevantChunks.map((chunk) => ({
      fileName: chunk.fileName,
      chunkIndex: chunk.chunkIndex
    }));

    res.json({ reply, sources });
  } catch (error) {
    console.error('Chat route error:', error.message);
    res.status(500).json({ error: 'Something went wrong while talking to the AI model' });
  }
});

export default router;