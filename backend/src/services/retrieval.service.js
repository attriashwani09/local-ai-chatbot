import { generateEmbedding } from './embedding.service.js';
import { searchSimilarChunks } from './vectorstore.service.js';

const SIMILARITY_THRESHOLD = 1.0;
const TOP_K = 5;

export async function retrieveRelevantChunks(question) {
  const queryVector = await generateEmbedding(question);

  const results = await searchSimilarChunks(queryVector, TOP_K);

  const relevantResults = results.filter((result) => {
    const distance = result._distance;
    return distance <= SIMILARITY_THRESHOLD;
  });

  return relevantResults.map((result) => ({
    text: result.text,
    fileName: result.fileName,
    chunkIndex: result.chunkIndex,
    distance: result._distance
  }));
}