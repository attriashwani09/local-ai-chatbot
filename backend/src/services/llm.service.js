import { OLLAMA_BASE_URL, OLLAMA_MODEL } from '../config/ollama.config.js';

export async function askOllama(promptText) {
  const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      prompt: promptText,
      stream: false
    })
  });

  if (!response.ok) {
    throw new Error(`Ollama request failed with status ${response.status}`);
  }

  const data = await response.json();
  return data.response;
}

export function buildConstrainedPrompt(question, contextChunks) {
  const contextText = contextChunks
    .map((chunk, i) => `[${i + 1}] ${chunk.text}`)
    .join('\n\n');

  return `You must answer ONLY using the provided context below.
If the answer is not contained in the context, respond with exactly: "Data not available."
Do not use any prior knowledge. Do not guess. Do not make assumptions beyond what is written.

Context:
${contextText}

Question: ${question}

Answer:`;
}