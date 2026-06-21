import { readFile } from 'fs/promises';

export async function parseTxt(filePath) {
  const content = await readFile(filePath, 'utf-8');
  return content;
}