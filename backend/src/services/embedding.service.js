import { OLLAMA_BASE_URL } from '../config/ollama.config.js';

const EMBEDDING_MODEL = 'nomic-embed-text';

export async function generateEmbedding(text) {
  const response = await fetch(`${OLLAMA_BASE_URL}/api/embed`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: EMBEDDING_MODEL,
      input: text
    })
  });

  if (!response.ok) {
    throw new Error(`Embedding request failed with status ${response.status}`);
  }

  const data = await response.json();
  return data.embeddings[0];
}