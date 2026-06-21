import { parseFile } from './parser.service.js';
import { chunkText } from './chunking.service.js';
import { generateEmbedding } from './embedding.service.js';
import { addChunks } from './vectorstore.service.js';

export async function ingestFile(filePath, originalName) {
  const rawText = await parseFile(filePath);

  if (!rawText || rawText.trim() === '') {
    throw new Error('No readable text found in this file');
  }

  const chunks = chunkText(rawText);

  if (chunks.length === 0) {
    throw new Error('File content could not be split into chunks');
  }

  const chunksData = [];

  for (let i = 0; i < chunks.length; i++) {
    const chunkContent = chunks[i];
    const vector = await generateEmbedding(chunkContent);

    chunksData.push({
      vector,
      text: chunkContent,
      fileName: originalName,
      chunkIndex: i
    });
  }

  await addChunks(chunksData);

  return {
    fileName: originalName,
    totalChunks: chunksData.length
  };
}