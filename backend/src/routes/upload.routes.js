import express from 'express';
import upload from '../middleware/upload.middleware.js';
import { ingestFile } from '../services/ingestion.service.js';

const router = express.Router();

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const result = await ingestFile(req.file.path, req.file.originalname);

    res.json({
      message: 'File uploaded and processed successfully',
      fileName: result.fileName,
      totalChunks: result.totalChunks
    });
  } catch (error) {
    console.error('Upload route error:', error.message);
    res.status(500).json({ error: error.message || 'Something went wrong while processing the file' });
  }
});

export default router;