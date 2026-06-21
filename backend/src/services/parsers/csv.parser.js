import { readFile } from 'fs/promises';
import { parse } from 'csv-parse/sync';

export async function parseCsv(filePath) {
  const fileContent = await readFile(filePath, 'utf-8');

  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  });

  const textChunks = records.map((row, index) => {
    const rowText = Object.entries(row)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');
    return `Row ${index + 1} — ${rowText}`;
  });

  return textChunks.join('\n');
}