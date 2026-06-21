export function chunkText(text, options = {}) {
  const chunkSize = options.chunkSize || 800;
  const overlap = options.overlap || 100;

  const cleanedText = text.replace(/\s+/g, ' ').trim();

  if (cleanedText.length === 0) {
    return [];
  }

  const chunks = [];
  let startIndex = 0;

  while (startIndex < cleanedText.length) {
    const endIndex = Math.min(startIndex + chunkSize, cleanedText.length);
    const chunk = cleanedText.slice(startIndex, endIndex);
    chunks.push(chunk.trim());

    if (endIndex === cleanedText.length) break;

    startIndex = endIndex - overlap;
  }

  return chunks;
}