import { readFile } from 'fs/promises';
import { PDFParse } from 'pdf-parse';

export async function parsePdf(filePath) {
  const dataBuffer = await readFile(filePath);
  const parser = new PDFParse({ data: dataBuffer });

  const result = await parser.getText();
  await parser.destroy();

  return result.text;
}