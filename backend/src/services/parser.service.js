import path from 'path';
import { parseTxt } from './parsers/txt.parser.js';
import { parseCsv } from './parsers/csv.parser.js';
import { parsePdf } from './parsers/pdf.parser.js';
import { parseXlsx } from './parsers/xlsx.parser.js';

export async function parseFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  switch (ext) {
    case '.txt':
      return await parseTxt(filePath);
    case '.csv':
      return await parseCsv(filePath);
    case '.pdf':
      return await parsePdf(filePath);
    case '.xlsx':
      return await parseXlsx(filePath);
    default:
      throw new Error(`Unsupported file type: ${ext}`);
  }
}