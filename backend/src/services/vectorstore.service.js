import * as lancedb from '@lancedb/lancedb';

const DB_PATH = 'data/vectordb';
const TABLE_NAME = 'document_chunks';

let dbConnection = null;

async function getConnection() {
  if (!dbConnection) {
    dbConnection = await lancedb.connect(DB_PATH);
  }
  return dbConnection;
}

async function getOrCreateTable() {
  const db = await getConnection();
  const tableNames = await db.tableNames();

  if (tableNames.includes(TABLE_NAME)) {
    return await db.openTable(TABLE_NAME);
  }

  return null;
}

export async function addChunks(chunksData) {
  const db = await getConnection();
  const tableNames = await db.tableNames();

  if (tableNames.includes(TABLE_NAME)) {
    const table = await db.openTable(TABLE_NAME);
    await table.add(chunksData);
  } else {
    await db.createTable(TABLE_NAME, chunksData);
  }
}

export async function searchSimilarChunks(queryVector, limit = 5) {
  const table = await getOrCreateTable();

  if (!table) {
    return [];
  }

  const results = await table
    .search(queryVector)
    .limit(limit)
    .toArray();

  return results;
}