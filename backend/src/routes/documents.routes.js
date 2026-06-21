import express from 'express';
import { listDocuments, deleteDocumentChunks } from '../services/vectorstore.service.js';

const router = express.Router();

router.get('/documents', async (req, res) => {
  try {
    const documents = await listDocuments();
    res.json({ documents });
  } catch (error) {
    console.error('List documents error:', error.message);
    res.status(500).json({ error: 'Failed to list documents' });
  }
});

router.delete('/documents/:fileName', async (req, res) => {
  try {
    const { fileName } = req.params;
    const result = await deleteDocumentChunks(fileName);
    res.json(result);
  } catch (error) {
    console.error('Delete document error:', error.message);
    res.status(500).json({ error: 'Failed to delete document' });
  }
});

export default router;