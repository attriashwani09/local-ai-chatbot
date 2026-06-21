import * as XLSX from 'xlsx';

export async function parseXlsx(filePath) {
  const workbook = XLSX.readFile(filePath);
  const allSheetsText = [];

  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });

    const sheetChunks = rows.map((row, index) => {
      const rowText = Object.entries(row)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
      return `Sheet "${sheetName}", Row ${index + 1} — ${rowText}`;
    });

    allSheetsText.push(...sheetChunks);
  }

  return allSheetsText.join('\n');
}